"use client";
import { useStoreProfile } from "@/context/StoreProviderContext";
import { useUserProfile } from "@/context/UserProfileContext";
import Image from "next/image";
import Link from "next/link";

export default function Sidebar() {
  const { user } = useUserProfile();
  const { store } = useStoreProfile();

  const dashboardLinks = [
    { name: "Home", link: "/dashboard" },
    { name: "My Store", link: "/dashboard/store" },
    { name: "Settings", link: "/dashboard/settings"}
  ];

  return (
    <section className="fixed bottom-0 flex h-auto w-full flex-row justify-center gap-5 border-t-2 border-r-2 border-gray-100 bg-white p-5 md:sticky md:top-0 md:h-screen md:w-1/5 md:flex-shrink-0 md:flex-col md:justify-between">
      <Link className="hidden md:block" href={"/dashboard"}>
        <Image
          alt=""
          src={"/logo_black.svg"}
          className="h-full w-24"
          height={32}
          width={100}
        />
      </Link>

      <nav className="md:block">
        <ul className="flex gap-5 md:flex-col">
          {dashboardLinks.map((link) => (
            <li key={link.name}>
              <Link className="text-xl font-bold" href={link.link}>
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="hidden md:block">
        <ul className="flex flex-col gap-5">
          <li>
            <Link
              className="flex items-center gap-2"
              href="/dashboard/settings"
            >
              {store?.profilePicture ? (
                <Image
                  className="h-10 w-10 rounded-full object-cover"
                  alt=""
                  src={store?.profilePicture || "/placeholder.jpg"}
                  height={100}
                  width={100}
                />
              ) : (
                <p className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
                  M
                </p>
              )}

              <p className="font-bold">
                {user
                  ? user.name.length > 10
                    ? user.name.substring(0, 10) + "..."
                    : user.name
                  : ""}
              </p>
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
