"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { useUserProfile } from "@/context/UserProfileContext";
import updateUsers from "@/api/supabase/post/myProfileUpdate";
import { MyProfile } from "@/types/profile";
import { IoIosClose } from "react-icons/io";

interface FormErrors {
  email?: string;
  phone?: string;
}

interface SubSetting {
  icon: string;
  name: string;
  link: string;
}

export default function Settings() {
  const { user, setUser } = useUserProfile();

  console.log(user);

  const initialUser: MyProfile = {
    id: user?.id || "",
    name: user?.name || "",
    username: user?.username || "",
    email: user?.email || "",
    phonenumber: user?.phonenumber || "",
  };

  const [newUserInfo, setNewUserInfo] = useState<MyProfile>(initialUser);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState("");
  const [usernamePopup, setUsernamePopup] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex =
      /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
    return phoneRegex.test(phone);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Updates the user information
    setNewUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear errors when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!validateEmail(newUserInfo.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!validatePhone(newUserInfo.phonenumber)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdateUser = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;
    if (!user) return;

    // Check if username has changed before saving
    if (newUserInfo.username !== user.username) {
      setUsernamePopup(true);

      return;
    }

    await saveUserChanges();
  };

  const handlePopupUpdate = async () => {
    await saveUserChanges();
  };


  const saveUserChanges = async () => {
    setIsSaving(true);
    setSaveStatus("Saving...");

    try {
      if (user) {
        await updateUsers(newUserInfo, user.id);

        // Update user state after successful update
        setUser((prevUser) => ({
          ...prevUser,
          ...newUserInfo,
        }));

        setSaveStatus("Saved!");

        setTimeout(() => {
          setSaveStatus("");
        }, 2000);
      }
    } catch (error) {
      console.error(error);
      setSaveStatus("Error saving");
    } finally {
      setIsSaving(false);
      setUsernamePopup(false);
    }
  };

  const subSettings: SubSetting[] = [
    {
      icon: "",
      name: "Profile",
      link: "/dashboard/profile",
    },
    {
      icon: "",
      name: "Integrations",
      link: "/dashboard/integrations",
    },
    {
      icon: "",
      name: "Email Notifications",
      link: "/dashboard/email-notifications",
    },
  ];

  return (
    <main className="p-8">
      <ul className="flex gap-5">
        {subSettings.map((link) => (
          <li key={link.name}>
            <a href={link.link}>{link.name}</a>
          </li>
        ))}
      </ul>

      <section>
        <form onSubmit={handleUpdateUser}>
          <h2 className="mb-3 mt-5 text-xl font-bold">My Profile</h2>

          <div className="flex gap-5">
            <div>
              <label htmlFor="name">Name:</label>
              <input
                className="input-field"
                type="text"
                id="name"
                name="name"
                value={newUserInfo.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="username">Username:</label>
              <input
                className="input-field"
                type="text"
                id="username"
                name="username"
                value={newUserInfo.username}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="mt-5 flex gap-5">
            <div>
              <label htmlFor="email">Email:</label>
              <input
                className={`input-field ${errors.email ? "border-red-500" : ""}`}
                type="email"
                id="email"
                name="email"
                value={newUserInfo.email}
                onChange={handleInputChange}
                required
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>
            <div>
              <label htmlFor="phonenumber">Phone Number:</label>
              <input
                className={`input-field ${errors.phone ? "border-red-500" : ""}`}
                type="tel"
                id="phonenumber"
                name="phonenumber"
                value={newUserInfo.phonenumber}
                onChange={handleInputChange}
                required
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
              )}
            </div>
          </div>
          <div className="mt-5 flex items-center gap-3">
            <button
              className="w-max rounded bg-blue-600 px-10 py-2 text-sm font-bold text-white disabled:opacity-50"
              type="submit"
              disabled={isSaving}
            >
              Update
            </button>
            {saveStatus && (
              <span
                className={`text-sm ${saveStatus === "Saved!" ? "text-green-600" : saveStatus === "Error saving" ? "text-red-600" : "text-gray-600"}`}
              >
                {saveStatus}
              </span>
            )}
          </div>
        </form>

        {usernamePopup && (
          <div>
            <div className="absolute left-1/2 top-1/2 z-50 flex -translate-x-1/2 -translate-y-1/2 transform flex-col items-center gap-4 bg-white p-10 text-center">
              <button
                className="absolute right-4 top-4"
                onClick={() => setUsernamePopup(false)}
              >
                <IoIosClose size={30} />
              </button>
              <p>
                You&apos;re about to change your username, this also changes
                your store URL. Make sure to update your store URL:
              </p>
              <div>
                <b>New link</b>
                <p>{`${process.env.NEXT_PUBLIC_BASE_URL}/${newUserInfo.username}`}</p>
              </div>

              <button
                className="w-max rounded bg-blue-600 px-10 py-2 text-sm font-bold text-white disabled:opacity-50"
                onClick={handlePopupUpdate}
              >
                Update
              </button>
            </div>

            <div className="absolute left-0 top-0 h-full w-full bg-slate-800/55"></div>
          </div>
        )}
      </section>
    </main>
  );
}