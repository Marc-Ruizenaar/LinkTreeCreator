"use client";
import Link from "next/link";
import {
  FaInstagram,
  FaTiktok,
  FaFacebook,
  FaYoutube,
  FaLinkedin,
  FaTwitter,
  FaSpotify,
  FaPinterest,
  FaTwitch,
  FaSnapchat,
  FaDiscord,
  FaEtsy,
  FaVimeo,
  FaLink,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Image from "next/image";
import { useStoreProfile } from "@/context/StoreProviderContext";
import { useUserProfile } from "@/context/UserProfileContext";

export default function Header() {
  const { store } = useStoreProfile();
  const { user } = useUserProfile();

  return (
    <Link
      href="/dashboard/profile"
      className="flex gap-5 rounded-2xl bg-gray-100 p-4"
    >
      {store?.profilePicture ? (
        <Image
          className="aspect-square overflow-hidden rounded"
          src={store?.profilePicture || "/default-avatar.png"}
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
          <p className="text-xl font-bold">{user?.name}</p>
          <p className="text-gray-500">@{store?.displayname}</p>
        </div>

        <div className="flex gap-1">
          {store?.tiktok && (
            <div>
              <FaTiktok size={25} />
            </div>
          )}

          {store?.instagram && (
            <div>
              <FaInstagram size={25} />
            </div>
          )}

          {store?.facebook && (
            <div>
              <FaFacebook size={25} />
            </div>
          )}

          {store?.youtube && (
            <div>
              <FaYoutube size={25} />
            </div>
          )}

          {store?.linkedin && (
            <div>
              <FaLinkedin size={25} />
            </div>
          )}

          {store?.x && (
            <div>
              <FaTwitter size={25} />
            </div>
          )}

          {store?.pinterest && (
            <div>
              <FaPinterest size={25} />
            </div>
          )}

          {store?.spotify && (
            <div>
              <FaSpotify size={25} />
            </div>
          )}

          {store?.etsy && (
            <div>
              <FaEtsy size={25} />
            </div>
          )}

          {store?.discord && (
            <div>
              <FaDiscord size={25} />
            </div>
          )}

          {store?.snapchat && (
            <div>
              <FaSnapchat size={25} />
            </div>
          )}

          {store?.twitch && (
            <div>
              <FaTwitch size={25} />
            </div>
          )}

          {store?.vimeo && (
            <div>
              <FaVimeo size={25} />
            </div>
          )}

          {store?.email && (
            <div>
              <MdEmail size={25} />
            </div>
          )}

          {store?.website && (
            <div>
              <FaLink size={20} />
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
