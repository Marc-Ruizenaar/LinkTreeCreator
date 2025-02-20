"use client";
import ProfileImage from "@/components/dashboard/profile/ProfileImage";
import SocialMediaInput from "@/components/dashboard/profile/SocialMedia";
import UpdateStoreProfileData from "@/api/supabase/updateUsers";
import { useState } from "react";
import { SocialMediaLinks } from "@/types/profile";

interface ProfileFormProps {
  displayname: string;
  bio: string;
  instagram: string;
  tiktok: string;
  socialLinks: SocialMediaLinks;
  setDisplayName: React.Dispatch<React.SetStateAction<string>>;
  setBio: React.Dispatch<React.SetStateAction<string>>;
  setInstagram: React.Dispatch<React.SetStateAction<string>>;
  setTikTok: React.Dispatch<React.SetStateAction<string>>;
  setSocialLinks: React.Dispatch<React.SetStateAction<SocialMediaLinks>>;
  user_id?: string;
}

export default function ProfileForm({
  displayname,
  bio,
  instagram,
  tiktok,
  socialLinks,
  setDisplayName,
  setBio,
  setInstagram,
  setTikTok,
  setSocialLinks,
  user_id,
}: ProfileFormProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSaving(true);
    setSaveStatus("Saving...");

    const data = {
      displayname: displayname,
      bio: bio,
      tiktok: tiktok,
      instagram: instagram,
      ...socialLinks,
    };

    try {
      if (user_id) {
        await UpdateStoreProfileData(data, user_id);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    switch (name) {
      case "displayname":
        setDisplayName(value);
        break;
      case "bio":
        setBio(value);
        break;
      case "instagram":
        setInstagram(value);
        break;
      case "tiktok":
        setTikTok(value);
        break;
      default:
        setSocialLinks((prev) => ({ ...prev, [name]: value }));
        break;
    }
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
          <label htmlFor="bio">Bio:</label>
          <input
            className="input-field"
            type="text"
            id="bio"
            name="bio"
            value={bio}
            onChange={handleInputChange}
            required
          />
        </div>

        <SocialMediaInput
          instagram={instagram}
          tiktok={tiktok}
          socialLinks={socialLinks}
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
