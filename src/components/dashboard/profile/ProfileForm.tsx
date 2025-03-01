"use client";
import ProfileImage from "@/components/dashboard/profile/ProfileImage";
import SocialMediaInput from "@/components/dashboard/profile/SocialMedia";
import { useEffect, useState, useCallback, useRef } from "react"; // Import useRef
import updateStoreProfileData from "@/api/supabase/post/updateStoreProfileData";
import { useStoreProfile } from "@/context/StoreProviderContext";
import { SocialArray } from "@/types/profile";

export default function ProfileForm() {
  const { store, setStore } = useStoreProfile();
  const user_id = store?.user_id;

  const initialDisplayName: string = store?.displayname || "";
  const initialBio: string = store?.bio || "";
  const initialSocialMedia: SocialArray[] = (store?.socialmedia as SocialArray[]) || [];

  const [displayname, setDisplayName] = useState(initialDisplayName);
  const [bio, setBio] = useState(initialBio);
  const [socialmedia, setSocialmedia] = useState(initialSocialMedia);

  // Use useRef to store previous values for comparison
  const prevDisplayName = useRef(initialDisplayName);
  const prevBio = useRef(initialBio);
  const prevSocialMedia = useRef(initialSocialMedia);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      if (name === "displayname") {
        setDisplayName(value);
      } else if (name === "bio") {
        setBio(value);
      } else {
        setSocialmedia((prevSocialmedia: SocialArray[]) => {
          const updatedSocialmedia = prevSocialmedia.map((item: SocialArray) => {
            if (item.platform === name) {
              return { ...item, link: value };
            }
            return item;
          });

          return updatedSocialmedia;
        });
      }
    },
    []
  );

  useEffect(() => {
    // Only update the store if displayname or bio has actually changed
    if (displayname !== prevDisplayName.current || bio !== prevBio.current) {
      if (store) {
        setStore({
          ...store,
          displayname: displayname,
          bio: bio,
        });
        prevDisplayName.current = displayname;
        prevBio.current = bio;
      }
    }
  }, [displayname, bio, store, setStore]);

  useEffect(() => {
    // Function to compare two arrays of objects
    const areEqual = (a: SocialArray[], b: SocialArray[]) => {
      if (a.length !== b.length) return false;
      for (let i = 0; i < a.length; i++) {
        if (a[i].platform !== b[i].platform || a[i].link !== b[i].link) {
          return false;
        }
      }
      return true;
    };

    if (store && !areEqual(socialmedia, prevSocialMedia.current)) {
      setStore({
        ...store,
        socialmedia: socialmedia,
      });
      prevSocialMedia.current = socialmedia;
    }
  }, [socialmedia, store, setStore]);

  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSaving(true);
    setSaveStatus("Saving...");

    const data = {
      displayname: displayname,
      bio: bio,
      socialmedia: socialmedia,
    };

    try {
      if (user_id) {
        await updateStoreProfileData(data, user_id);
        setSaveStatus("Saved!");
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      setSaveStatus("Error saving");
    } finally {
      setIsSaving(false);
    }

    setTimeout(() => {
      setSaveStatus("");
    }, 2000);
  };

  return (
    <div className="flex w-full flex-col gap-4 rounded-xl bg-slate-50 p-5">
      <ProfileImage />

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <label htmlFor="displayname">Display name:</label>
          <input
            className="input-field"
            type="text"
            id="displayname"
            name="displayname"
            value={displayname}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="bio" className="flex justify-between">
            Bio:
            <span className="text-gray-400">{bio.length}/80</span>
          </label>
          <input
            className="input-field"
            type="text"
            id="bio"
            name="bio"
            value={bio}
            onChange={handleInputChange}
            required
            maxLength={80}
          />
        </div>

        <SocialMediaInput
          socialLinks={socialmedia}
          onInputChange={handleInputChange}
        />

        <button
          type="submit"
          className="w-max cursor-pointer rounded-md bg-green-500 px-10 py-2 text-white"
          disabled={isSaving}
        >
          Save
        </button>
        {saveStatus && (
          <span
            className={`text-sm ${
              saveStatus === "Saved!"
                ? "text-green-600"
                : saveStatus === "Error saving"
                  ? "text-red-600"
                  : "text-gray-600"
            }`}
          >
            {saveStatus}
          </span>
        )}
      </form>
    </div>
  );
}