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
import { MyProfile, Store } from "@/types/profile";

interface StoreData {
  userData: MyProfile;
  storeData: Store[] | null;
}

export default function UserProfile({ userData, storeData }: StoreData) {

  console.log(storeData);

    const currentStore = storeData ? storeData[0] : null;


  return (
    <div className="container mx-auto flex w-1/2 flex-col items-center justify-center gap-5 p-4">
      {currentStore?.profilePicture ? (
        <Image
          className="rounded-full"
          src={currentStore?.profilePicture || ""}
          alt=""
          width={100}
          height={100}
        />
      ) : (
        <p className="flex h-[100px] w-[100px] items-center justify-center rounded-full bg-blue-600 text-4xl font-bold text-white">
          M
        </p>
      )}

      <h1 className="text-2xl font-bold">{userData.username}</h1>

      <div>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {currentStore.tiktok && (
            <a
              href={`https://www.tiktok.com/@${currentStore.tiktok}`}
              target="_blank"
            >
              <FaTiktok size={25} />
            </a>
          )}

          {currentStore.instagram && (
            <a
              href={`https://www.instagram.com/${currentStore.instagram}`}
              target="_blank"
            >
              <FaInstagram size={25} />
            </a>
          )}

          {currentStore.facebook && (
            <a
              href={`https://www.facebook.com/${currentStore.facebook}`}
              target="_blank"
            >
              <FaFacebook size={25} />
            </a>
          )}

          {currentStore.youtube && (
            <a
              href={`https://www.youtube.com/${currentStore.youtube}`}
              target="_blank"
            >
              <FaYoutube size={25} />
            </a>
          )}

          {currentStore.linkedin && (
            <a
              href={`https://www.linkedin.com/in/${currentStore.linkedin}`}
              target="_blank"
            >
              <FaLinkedin size={25} />
            </a>
          )}

          {currentStore.x && (
            <a href={`https://twitter.com/${currentStore.x}`} target="_blank">
              <FaTwitter size={25} />
            </a>
          )}

          {currentStore.pinterest && (
            <a
              href={`https://www.pinterest.com/${currentStore.pinterest}`}
              target="_blank"
            >
              <FaPinterest size={25} />
            </a>
          )}

          {currentStore.spotify && (
            <a
              href={`https://open.spotify.com/user/${currentStore.spotify}`}
              target="_blank"
            >
              <FaSpotify size={25} />
            </a>
          )}

          {currentStore.etsy && (
            <a
              href={`https://www.etsy.com/shop/${currentStore.etsy}`}
              target="_blank"
            >
              <FaEtsy size={25} />
            </a>
          )}

          {currentStore.discord && (
            <a
              href={`https://discord.com/users/${currentStore.discord}`}
              target="_blank"
            >
              <FaDiscord size={25} />
            </a>
          )}

          {currentStore.snapchat && (
            <a
              href={`https://www.snapchat.com/add/${currentStore.snapchat}`}
              target="_blank"
            >
              <FaSnapchat size={25} />
            </a>
          )}

          {currentStore.twitch && (
            <a
              href={`https://www.twitch.tv/${currentStore.twitch}`}
              target="_blank"
            >
              <FaTwitch size={25} />
            </a>
          )}

          {currentStore.vimeo && (
            <a href={`https://vimeo.com/${currentStore.vimeo}`} target="_blank">
              <FaVimeo size={25} />
            </a>
          )}

          {currentStore.email && (
            <a href={`mailto:${currentStore.email}`}>
              <MdEmail size={25} />
            </a>
          )}

          {currentStore.website && (
            <a href={currentStore.website} target="_blank">
              <FaLink size={20} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
