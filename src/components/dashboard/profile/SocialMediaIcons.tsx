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
import { SocialArray } from "@/types/profile";
import { IconType } from "react-icons";
import { useStoreProfile } from "@/context/StoreProviderContext";
import Link from "next/link";
import { useMemo } from "react";

interface IconComponents {
  FaTiktok: IconType;
  FaInstagram: IconType;
  FaFacebook: IconType;
  FaYoutube: IconType;
  FaLinkedin: IconType;
  FaTwitter: IconType;
  FaPinterest: IconType;
  FaSpotify: IconType;
  FaEtsy: IconType;
  FaDiscord: IconType;
  FaSnapchat: IconType;
  FaTwitch: IconType;
  FaVimeo: IconType;
  MdEmail: IconType;
  FaLink: IconType;
}

interface SocialMediaSettings {
  createLink?: boolean;
  addSpacing?: boolean;
  centerIcons?: boolean;
  socialMedia?: SocialArray[];
}

export default function SocialMediaIcons({
  createLink,
  addSpacing,
  centerIcons,
  socialMedia,
}: SocialMediaSettings) {

  const { store } = useStoreProfile();

  // Use useMemo to derive socialMediaArray based on props and store
  const socialMediaArray: SocialArray[] = useMemo(() => {
    if (socialMedia) {
      return socialMedia;
    } else if (store?.socialmedia) {
      return store.socialmedia;
    } else {
      return []; // Or any other default value you want
    }
  }, [socialMedia, store?.socialmedia]); // Dependencies for useMemo

  if (!socialMediaArray || !Array.isArray(socialMediaArray)) {
    return null;
  }

  const iconComponents: IconComponents = {
    FaTiktok,
    FaInstagram,
    FaFacebook,
    FaYoutube,
    FaLinkedin,
    FaTwitter,
    FaPinterest,
    FaSpotify,
    FaEtsy,
    FaDiscord,
    FaSnapchat,
    FaTwitch,
    FaVimeo,
    MdEmail,
    FaLink,
  };
  return (
    <div className={`flex gap-2 ${addSpacing === true ? "my-4" : ""} ${centerIcons === true ? "justify-center" : ""}`}>
      {socialMediaArray.map((social: SocialArray) => {
        if (!social.link) return null;

        const IconComponent =
          iconComponents[social.icon as keyof IconComponents];

        if (createLink === true) {
          return (
            <Link target="_blank" href={social.link} key={social.platform}>
              {IconComponent ? <IconComponent size={25} /> : null}
            </Link>
          );
        } else {
          return (
            <div key={social.platform}>
              {IconComponent ? <IconComponent size={25} /> : null}
            </div>
          );
        }
      })}
    </div>
  );
}