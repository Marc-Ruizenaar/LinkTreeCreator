"use client";
import Header from "@/components/dashboard/stores/Header";
import { useStoreProfile } from "@/context/StoreProviderContext";
import StoreSections from "@/components/dashboard/stores/StoreSections";
import PhoneSimulator from "@/components/dashboard/stores/phonesimulator/PhoneSimulator";
import NewSections from "@/components/dashboard/stores/NewSections";
import Placeholder from "@/components/dashboard/placeholder/Placeholder";
import { useState } from "react";

export default function Stores() {
  const { store } = useStoreProfile();
  const [storeCreatingPopup, setStoreCreatingPopup] = useState(false);

  return (
    <main className="h-full">
      {store ? (
        <div className="flex gap-5 p-8">
          <div className="w-full">
            <Header />
            <StoreSections />
            <NewSections />
          </div>

          <PhoneSimulator />
        </div>
      ) : (
        <Placeholder setStoreCreatingPopup={setStoreCreatingPopup} />
      )}

      {storeCreatingPopup && (
        <div>
          <div className="absolute left-1/2 top-1/2 z-50 flex -translate-x-1/2 -translate-y-1/2 transform flex-col items-center gap-8 rounded-2xl bg-white px-20 py-10 text-center">
            <div>
              <h2 className="text-2xl font-bold">Creating store</h2>
              <p className="mt-2">
                We are creating your store, this might take a few seconds
              </p>
            </div>
            <div
              className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-black motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            ></div>
          </div>

          <div className="absolute left-0 top-0 h-full w-full bg-slate-800/55"></div>
        </div>
      )}
    </main>
  );
}
