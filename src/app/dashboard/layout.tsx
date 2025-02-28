import type { Metadata } from "next";
import "@/styles/globals.css";
import { Raleway } from "next/font/google";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import Sidebar from "@/components/dashboard/layout/Sidebar";
import TopBar from "@/components/dashboard/layout/TopBar";
import { UserProfileProvider } from "@/context/UserProfileContext";
import { StoreProfile } from "@/context/StoreProviderContext";
import { StoreSection } from "@/context/StoreSectionsProviderContext";
import GetUser from "@/api/supabase/get/getUsers";
import GetStoreSections from "@/api/supabase/get/getStoreSections";
import GetStores from "@/api/supabase/get/getStores";
import { UserProvider } from "@/context/UserValidationContext";

const raleway = Raleway({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard - Your creator Store",
  description: "We work 1-on-1 with the Top Creators to monetize their business.",
};

async function fetchUserData(userId: string) {
  return await GetUser(userId);
}

async function fetchRemainingData(userId: string) {
  const [storeData, storeSectionData] = await Promise.all([
    GetStores(userId),
    GetStoreSections(userId)
  ]);
  
  return { storeData, storeSectionData };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();

  const { data: userKey, error: userKeyError } = await supabase.auth.getUser();

  if (userKeyError || !userKey?.user) {
    redirect("/login");
  }

  const user_id = userKey.user.id;

  const userData = await fetchUserData(user_id);
  
  const { storeData, storeSectionData } = await fetchRemainingData(user_id);

  return (
    <html lang="en">
      <body className={raleway.className}>
        <UserProvider user={userKey.user}>
          <UserProfileProvider data={userData[0]}>
            <StoreProfile data={storeData?.[0]}>
              <StoreSection data={storeSectionData ?? []}>
                <div className="flex">
                  <Sidebar />
                  <div className="flex w-4/5 flex-col">
                    <TopBar />
                    {children}
                  </div>
                </div>
              </StoreSection>
            </StoreProfile>
          </UserProfileProvider>
        </UserProvider>
      </body>
    </html>
  );
}