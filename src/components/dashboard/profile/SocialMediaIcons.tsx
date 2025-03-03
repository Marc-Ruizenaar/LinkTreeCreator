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

// This is a wrapper component that decides which implementation to use
export default function SocialMediaIcons(props: SocialMediaSettings) {
  // If socialMedia is provided directly, use the standalone version
  if (props.socialMedia) {
    return <SocialMediaIconsStandalone {...props} />;
  } 
  // Otherwise, use the version that requires the context
  else {
    return <SocialMediaIconsWithStore {...props} />;
  }
}

// Component that doesn't use the store
function SocialMediaIconsStandalone({
  createLink,
  addSpacing,
  centerIcons,
  socialMedia = [],
}: SocialMediaSettings) {
  return <RenderSocialIcons 
    createLink={createLink}
    addSpacing={addSpacing}
    centerIcons={centerIcons}
    socialMedia={socialMedia}
  />;
}

// Component that uses the store
function SocialMediaIconsWithStore({
  createLink,
  addSpacing,
  centerIcons,
}: Omit<SocialMediaSettings, 'socialMedia'>) {
  // Always call the hook at the top level
  const storeData = useStoreProfile();
  const socialMedia = storeData?.store?.socialmedia || [];
  
  return <RenderSocialIcons 
    createLink={createLink}
    addSpacing={addSpacing}
    centerIcons={centerIcons}
    socialMedia={socialMedia as SocialArray[]}
  />;
}

// Shared rendering component
function RenderSocialIcons({
  createLink,
  addSpacing,
  centerIcons,
  socialMedia,
}: Required<Pick<SocialMediaSettings, 'socialMedia'>> & Omit<SocialMediaSettings, 'socialMedia'>) {
  if (!socialMedia || !Array.isArray(socialMedia)) {
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
    <div
      className={`flex gap-2 ${addSpacing === true ? "my-4" : ""} ${centerIcons === true ? "justify-center" : ""}`}
    >
      {socialMedia.map((social: SocialArray) => {
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