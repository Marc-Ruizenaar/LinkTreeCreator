"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import updateUsers from "./actions";
import { useUserProfile } from "@/context/UserProfileContext";

interface UserInfo {
  name: string;
  userName: string;
  email: string;
  phone: string;
}

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
  const { user } = useUserProfile();

  const initialUser: UserInfo = {
    name: user?.name || "",
    userName: user?.displayname || "",
    email: user?.email || "",
    phone: user?.phonenumber || "",
  };

  const [newUserInfo, setNewUserInfo] = useState<UserInfo>(initialUser);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState("");

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    // Validates phone numbers in format: +1234567890 or (123) 456-7890 or 123-456-7890
    const phoneRegex =
      /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
    return phoneRegex.test(phone);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
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

    if (!validatePhone(newUserInfo.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdateUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSaving(true);
    setSaveStatus("Saving...");

    try {
      await updateUsers(newUserInfo, user?.id);
      setSaveStatus("Saved!");

      setTimeout(() => {
        setSaveStatus("");
      }, 2000);
    } catch (error) {

      console.log(error);
      setSaveStatus("Error saving");
    } finally {
      setIsSaving(false);
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
              <label htmlFor="userName">Username:</label>
              <input
                className="input-field"
                type="text"
                id="userName"
                name="userName"
                value={newUserInfo.userName}
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
              <label htmlFor="phone">Phone Number:</label>
              <input
                className={`input-field ${errors.phone ? "border-red-500" : ""}`}
                type="tel"
                id="phone"
                name="phone"
                value={newUserInfo.phone}
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
      </section>
    </main>
  );
}
