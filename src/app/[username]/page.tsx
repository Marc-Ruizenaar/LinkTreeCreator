"use client";
import UserProfile from "@/components/personalSites/UserProfile";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Sections from "@/components/personalSites/Sections";
import { MyProfile, Store } from "@/types/profile";
import getStoreBasedOnUsername from "@/api/supabase/get/getStoreBasedOnUsername";
import getStoresData from "@/api/supabase/get/getStores";

export default function StorePage() {
  const params = useParams<{ username: string }>();
  const [userData, setUserData] = useState<MyProfile | null>(null);
  const [storeData, setStoreData] = useState<Store[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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

  if (isLoading) {
    return null;
  }

  if (!userData) {
    notFound();
  }

  console.log(storeData);

  return (
    <main className="container-sm mx-5 md:mx-auto">
      <UserProfile userData={userData} storeData={storeData} />
      <Sections userData={userData} />
    </main>
  );
}
