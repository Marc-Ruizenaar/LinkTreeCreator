"use client";
import { useStoreProfile } from "@/context/StoreProviderContext";
import { useUser } from "@/context/UserValidationContext";
import Image from "next/image";
import Link from "next/link";

export default function Sidebar() {
  const { user } = useUser();
  const { store } = useStoreProfile();

  const dashboardLinks = [
    { name: "Home", link: "/dashboard" },
    { name: "My Store", link: "/dashboard/store" },
  ];

  return (
    <section className="sticky top-0 flex h-screen w-1/5 flex-shrink-0 flex-col justify-between gap-5 bg-blue-200 p-5">
      <Link href={"/dashboard"}>
        <Image
          alt=""
          src={"/logo_black.svg"}
          className="h-full w-24"
          height={32}
          width={100}
        />
      </Link>

      <nav>
        <ul className="flex flex-col gap-5">
          {dashboardLinks.map((link) => (
            <li key={link.name}>
              <Link className="text-xl font-bold" href={link.link}>
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div>
        <ul className="flex flex-col gap-5">
          <li>
            <Link href="/dashboard/settings">Settings</Link>
          </li>
          <li>
            <Link
              className="flex items-center gap-2"
              href="/dashboard/settings"
            >
              {store?.profilePicture ? (
                <Image
                  className="h-10 w-10 rounded-full object-cover"
                  alt=""
                  src={store?.profilePicture || "/default-avatar.png"}
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
                  ? user.user_metadata.name.length > 10
                    ? user.user_metadata.name.substring(0, 10) + "..."
                    : user.user_metadata.name
                  : ""}
              </p>
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
