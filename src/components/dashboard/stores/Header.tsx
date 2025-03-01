"use client";
import Link from "next/link";
import Image from "next/image";
import { useStoreProfile } from "@/context/StoreProviderContext";
import SocialMediaIcons from "../profile/SocialMediaIcons";

export default function Header() {
  const { store } = useStoreProfile();

  return (
    <Link
      href="/dashboard/profile"
      className="flex gap-5 rounded-2xl bg-gray-100 p-4"
    >
      {store?.profilePicture ? (
        <Image
          className="aspect-square overflow-hidden rounded object-cover"
          src={store?.profilePicture || "/placeholder.jpg"}
          alt=""
          height={120}
          width={120}
          priority
        />
      ) : (
        <p className="flex h-[100px] w-[100px] items-center justify-center rounded-full bg-blue-600 text-4xl font-bold text-white">
          M
        </p>
      )}

      <div className="flex flex-col justify-between py-2">
        <div>
          <p className="text-xl font-bold">{store?.displayname}</p>
          <p className="text-gray-500">{store?.bio}</p>
        </div>

        <SocialMediaIcons addSpacing={false} createLink={false} />
      </div>
    </Link>
  );
}
