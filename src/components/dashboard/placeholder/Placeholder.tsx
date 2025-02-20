"use client";
import { createNewStore } from "@/api/supabase/push/createNewStore";
import { useStoreProfile } from "@/context/StoreProviderContext";
import { useUserProfile } from "@/context/UserProfileContext";
import { useRouter } from "next/navigation";

interface PlaceholderProps {
  setStoreCreatingPopup: (value: boolean) => void;
}

export default function Placeholder({
  setStoreCreatingPopup,
}: PlaceholderProps) {
  const { user } = useUserProfile();
  const { setStore } = useStoreProfile();
  const router = useRouter();

  const handleCreateNewStore = async () => {
    try {
      setStoreCreatingPopup(true);
      const newStoreResults = await createNewStore();
      console.log(newStoreResults);

      if (Array.isArray(newStoreResults) && newStoreResults.length > 0) {
        setStore(newStoreResults[0]);
      } else {
        setStore(null);
      }

      router.push("/dashboard/profile");
    } catch (error) {
      console.error("Error creating store:", error);
    }
  };

  return (
    <section className="relative h-full">
      <div className="flex flex-col gap-4 p-20">
        <div>
          <h1 className="text-2xl font-bold">
            Hey {user ? user.name : "there"},
          </h1>
          <p className="mt-2">
            Let&#39;s get started with creating your own linktree, click on the
            button below to start.
          </p>
        </div>

        <button
          className="w-max rounded bg-blue-600 px-10 py-2 text-sm font-bold text-white disabled:opacity-50"
          onClick={handleCreateNewStore}
        >
          Create store
        </button>
      </div>
    </section>
  );
}
