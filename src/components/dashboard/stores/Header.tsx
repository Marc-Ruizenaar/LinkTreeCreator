"use client";
import React from "react";
import Link from "next/link";
import {
  FaInstagram,
  FaTiktok,
  FaFacebook,
  FaYoutube,
  FaLinkedin,
  FaTwitter,
  FaTwitch,
  FaSnapchat,
  FaDiscord,
} from "react-icons/fa";
import Image from "next/image";
import { useStoreProfile } from "@/context/StoreProviderContext";
import { DataUser } from "@/context/StoreProviderContext";
import { useUserProfile } from "@/context/UserProfileContext";

export default function Header() {
  const { store } = useStoreProfile();
  const { user } = useUserProfile();

  const socialMediaPlatforms = {
    instagram: { icon: FaInstagram, baseUrl: "https://instagram.com/" },
    tiktok: { icon: FaTiktok, baseUrl: "https://tiktok.com/@" },
    facebook: { icon: FaFacebook, baseUrl: "https://facebook.com/" },
    youtube: { icon: FaYoutube, baseUrl: "https://youtube.com/" },
    linkedin: { icon: FaLinkedin, baseUrl: "https://linkedin.com/in/" },
    x: { icon: FaTwitter, baseUrl: "https://x.com/" },
    twitch: { icon: FaTwitch, baseUrl: "https://twitch.tv/" },
    snapchat: { icon: FaSnapchat, baseUrl: "https://snapchat.com/add/" },
    discord: { icon: FaDiscord, baseUrl: "https://discord.com/" },
  };

  if (store) {
    return (
      <Link
        href="/dashboard/profile"
        className="flex gap-5 rounded-2xl bg-gray-100 p-4"
      >
        <Image
          className="aspect-square overflow-hidden rounded"
          src={store?.profilePicture || "/default-avatar.png"}
          alt=""
          height={120}
          width={120}
        />
        <div className="flex flex-col justify-between py-2">
          <div>
            <p className="text-xl font-bold">{user?.name}</p>
            <p className="text-gray-500">@{store.displayname}</p>
          </div>

          <div className="flex gap-2">
            {Object.entries(socialMediaPlatforms).map(
              ([platform, { icon: Icon }]) => {
                const username = store[platform as keyof DataUser];
                return (
                  username && (
                    <div
                      key={platform}
                      className="transition-colors hover:text-blue-500"
                    >
                      <Icon size={20} />
                    </div>
                  )
                );
              },
            )}
          </div>
        </div>
      </Link>
    );
  }
}
