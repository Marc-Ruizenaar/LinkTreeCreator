"use client";
import { useState } from "react";
import { useStoreProfile } from "@/context/StoreProviderContext";
import PhoneSimulator from "@/components/dashboard/stores/phonesimulator/PhoneSimulator";
import { SocialMediaLinks } from "@/types/profile";
import ProfileForm from "@/components/dashboard/profile/ProfileForm";

export default function Profile() {
  const { store } = useStoreProfile();

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

  return (
    <main className="p-8">
      <div className="flex gap-5">
        <ProfileForm
          displayname={displayname}
          bio={bio}
          instagram={instagram}
          tiktok={tiktok}
          socialLinks={socialLinks}
          setDisplayName={setDisplayName}
          setBio={setBio}
          setInstagram={setInstagram}
          setTikTok={setTikTok}
          setSocialLinks={setSocialLinks}
          user_id={store?.user_id}
        />

        <PhoneSimulator
          displayname={displayname}
          bio={bio}
          instagram={instagram}
          tiktok={tiktok}
          socialLinks={socialLinks}
        />
      </div>
    </main>
  );
}
