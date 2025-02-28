"use client";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { MyProfile, Sections, SocialMediaLinks, Store } from "@/types/profile";
import getStoreBasedOnUsername from "@/api/supabase/get/getStoreBasedOnUsername";
import getStoresData from "@/api/supabase/get/getStores";
import PhoneUserData from "@/components/dashboard/stores/phonesimulator/PhoneUserData";
import PhoneSocials from "@/components/dashboard/stores/phonesimulator/PhoneSocials";
import PhoneSections from "@/components/dashboard/stores/phonesimulator/PhoneSections";
import getSectionsPublic from "@/api/supabase/get/getSectionsPublic";

export default function StorePage() {
  const params = useParams<{ username: string }>();
  const [userData, setUserData] = useState<MyProfile | null>(null);
  const [storeData, setStoreData] = useState<Store[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [displayname, setDisplayname] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [profilePicture, setProfilePicture] = useState<string>("");
  const [instagram, setInstagram] = useState<string>("");
  const [tiktok, setTikTok] = useState<string>("");
  const [socialLinks, setSocialLink] = useState<SocialMediaLinks>({
    email: "",
    facebook: "",
    youtube: "",
    website: "",
    pinterest: "",
    linkedin: "",
    x: "",
    spotify: "",
    applePodcast: "",
    etsy: "",
    discord: "",
    snapchat: "",
    twitch: "",
    vimeo: "",
  });
  const [sections, setSections] = useState<Sections[] | undefined>(undefined);

  // Fetch user data
  useEffect(() => {
    async function fetchUser() {
      try {
        const username = await getStoreBasedOnUsername(params.username);
        if (username.length === 0) {
          notFound();
          return;
        }
        const currentStore = username[0];
        setUserData(currentStore);

        if (currentStore?.user_id) {
          console.log("Fetching store data for user_id:", currentStore.user_id);
          const stores = await getStoresData(currentStore.user_id);
          setStoreData(stores);

          if (stores && stores.length > 0) {
            const store = stores[0];

            setDisplayname(store.displayname || "");
            setBio(store.bio || "");
            setProfilePicture(store.profilePicture || "");
            setInstagram(store.instagram || "");
            setTikTok(store.tiktok || "");
            setSocialLink({
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
          }
        }
      } catch (error) {
        console.error("Error fetching store:", error);
        notFound();
      } finally {
        setIsLoading(false);
      }
    }

    fetchUser();
  }, [params.username]);

  useEffect(() => {
    async function fetchSections() {
      if (!storeData || storeData.length === 0) {
        return;
      }

      try {
        const user_id = storeData[0].user_id;

        const fetchedSections = await getSectionsPublic(user_id as string);
        setSections(fetchedSections);
      } catch (error) {
        console.error("Error fetching sections:", error);
        notFound();
      }
    }

    fetchSections();
  }, [storeData]); 

  if (isLoading) {
    return null;
  }

  if (!userData) {
    notFound();
  }

  return (
    <main className="container-sm mx-5 p-4 md:mx-auto">
      <PhoneUserData
        displayname={displayname}
        bio={bio}
        profilePicture={profilePicture}
      />

      <PhoneSocials
        instagram={instagram}
        tiktok={tiktok}
        socialLinks={socialLinks}
      />

      <PhoneSections storeSections={sections} />
    </main>
  );
}
