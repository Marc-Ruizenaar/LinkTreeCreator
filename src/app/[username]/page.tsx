"use client";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { MyProfile, Sections, Store } from "@/types/profile";
import getStoreBasedOnUsername from "@/api/supabase/get/getStoreBasedOnUsername";
import getStoresData from "@/api/supabase/get/getStores";
import PhoneUserData from "@/components/dashboard/stores/phonesimulator/PhoneUserData";
import PhoneSections from "@/components/dashboard/stores/phonesimulator/PhoneSections";
import getSectionsPublic from "@/api/supabase/get/getSectionsPublic";
import SocialMediaIcons from "@/components/dashboard/profile/SocialMediaIcons";

export default function StorePage() {
  const params = useParams<{ username: string }>();
  const [userData, setUserData] = useState<MyProfile | null>(null);
  const [storeData, setStoreData] = useState<Store[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [displayname, setDisplayname] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [profilePicture, setProfilePicture] = useState<string>("");
  const [socialLinks, setSocialLink] = useState([]);
  const [sections, setSections] = useState<Sections[] | undefined>(undefined);

  console.log(socialLinks)

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
            setSocialLink(store.socialmedia);
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

      <SocialMediaIcons addSpacing={true} centerIcons={true} createLink={true} socialMedia={socialLinks}/>

      <PhoneSections storeSections={sections} />
    </main>
  );
}