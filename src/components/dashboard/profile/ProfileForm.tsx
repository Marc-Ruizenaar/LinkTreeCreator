"use client";
import ProfileImage from "@/components/dashboard/profile/ProfileImage";
import SocialMediaInput from "@/components/dashboard/profile/SocialMedia";
import { useEffect, useState } from "react";
import { SocialMediaLinks } from "@/types/profile";
import updateStoreProfileData from "@/api/supabase/post/updateStoreProfileData";
import { useStoreProfile } from "@/context/StoreProviderContext";

export default function ProfileForm() {
  const { store, setStore } = useStoreProfile();
  const user_id = store?.user_id;

  const initialDisplayName = store?.displayname || "";
  const initialBio = store?.bio || "";
  const initialInstagram = store?.instagram || "";
  const initialTikTok = store?.tiktok || "";

  const [displayname, setDisplayName] = useState(initialDisplayName);
  const [bio, setBio] = useState(initialBio);
  const [instagram, setInstagram] = useState(initialInstagram);
  const [tiktok, setTikTok] = useState(initialTikTok);
  const [socialLinks, setSocialLinks] = useState<SocialMediaLinks>({
    email: store?.email || "",
    facebook: store?.facebook || "",
    youtube: store?.youtube || "",
    website: store?.website || "",
    pinterest: store?.pinterest || "",
    linkedin: store?.linkedin || "",
    x: store?.x || "",
    spotify: store?.spotify || "",
    applePodcast: store?.applePodcast || "",
    etsy: store?.etsy || "",
    discord: store?.discord || "",
    snapchat: store?.snapchat || "",
    twitch: store?.twitch || "",
    vimeo: store?.vimeo || "",
  });

  useEffect(() => {
    if (store) {
      setStore({
        ...store,
        displayname,
        bio,
        instagram,
        tiktok,
      });
    }
  }, [displayname, bio, instagram, tiktok]);

  useEffect(() => {
    if (store) {
      setStore({
        ...store,
        ...socialLinks,
      });
    }
  }, [socialLinks]);

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
