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
    <section className="flex h-screen w-1/5 flex-shrink-0 flex-col justify-between gap-5 bg-blue-200 p-5">
      <Link href={"/dashboard"}>
        <Image alt="" src={"/stan_logo.svg"} height={26} width={80} />
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
              <Image
                className="h-10 w-10 rounded-full"
                alt=""
                src={store?.profilePicture || "/default-avatar.png"}
                height={100}
                width={100}
              />
              <p>{user ? user.user_metadata.name : ""}</p>
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
