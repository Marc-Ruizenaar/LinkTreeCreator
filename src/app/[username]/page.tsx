"use client";
import getStores from "@/api/supabase/get/getStoresBasedOnUsername";
import UserProfile from "@/components/personalSites/UserProfile";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Sections from "@/components/personalSites/Sections";
import { Store } from "@/types/profile";

export default function StorePage() {
  const params = useParams<{ username: string }>();
  const [storeData, setStoreData] = useState<Store>();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    async function fetchStores() {
      try {
        const stores = await getStores(params.username);
        if (stores.length === 0) {
          notFound();
        }
        const currentStore = stores[0];
        setStoreData(currentStore);
      } catch (error) {
        console.error("Error fetching store:", error);
        notFound();
      } finally {
        setIsLoading(false);
      }
    }

    fetchStores();
  }, [params.username]);

  if (isLoading) {
    return null;
  }

  if (!storeData) {
    notFound();
  }

  return (
    <main className="container-sm mx-5 md:mx-auto">
      <UserProfile storeData={storeData} />
      <Sections storeData={storeData} />
    </main>
  );
}
