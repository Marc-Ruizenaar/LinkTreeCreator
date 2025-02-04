"use client";
import Header from "@/components/dashboard/stores/Header";
import { createNewStore } from "./action";
import { useStoreProfile } from "@/context/StoreProviderContext";
import StoreSections from "@/components/dashboard/stores/StoreSections";
import PhoneSimulator from "@/components/dashboard/stores/phonesimulator/PhoneSimulator";
import NewSections from "@/components/dashboard/stores/NewSections";

export default function Stores() {
  const { store } = useStoreProfile();

  const displayname = store?.displayname || "";
  const bio = store?.bio || "";
  const instagram = store?.instagram || "";
  const tiktok = store?.tiktok || "";

  const socialLinks = {
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
  };

  return (
    <main className="p-8">
      {store ? (
        <div className="flex gap-5">
          <div className="w-full">
            <Header />
            <StoreSections />
            <NewSections />
          </div>

          <PhoneSimulator
            displayname={displayname}
            bio={bio}
            instagram={instagram}
            tiktok={tiktok}
            socialLinks={socialLinks}
          />
        </div>
      ) : (
        <div>
          <p>Create store button needs to come here!</p>
          <button onClick={createNewStore}>Create store</button>
        </div>
      )}
    </main>
  );
}
