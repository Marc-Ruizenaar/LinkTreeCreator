import { SocialMediaLinks } from "@/types/profile";
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

interface Socials {
  instagram: string;
  tiktok: string;
  socialLinks: SocialMediaLinks;
}

export default function PhoneSocials({
  instagram,
  tiktok,
  socialLinks,
}: Socials) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {tiktok && (
        <a href={`https://www.tiktok.com/@${tiktok}`} target="_blank">
          <FaTiktok size={25} />
        </a>
      )}

      {instagram && (
        <a href={`https://www.instagram.com/${instagram}`} target="_blank">
          <FaInstagram size={25} />
        </a>
      )}

      {socialLinks.facebook && (
        <a
          href={`https://www.facebook.com/${socialLinks.facebook}`}
          target="_blank"
        >
          <FaFacebook size={25} />
        </a>
      )}

      {socialLinks.youtube && (
        <a
          href={`https://www.youtube.com/${socialLinks.youtube}`}
          target="_blank"
        >
          <FaYoutube size={25} />
        </a>
      )}

      {socialLinks.linkedin && (
        <a
          href={`https://www.linkedin.com/in/${socialLinks.linkedin}`}
          target="_blank"
        >
          <FaLinkedin size={25} />
        </a>
      )}

      {socialLinks.x && (
        <a href={`https://twitter.com/${socialLinks.x}`} target="_blank">
          <FaTwitter size={25} />
        </a>
      )}

      {socialLinks.pinterest && (
        <a
          href={`https://www.pinterest.com/${socialLinks.pinterest}`}
          target="_blank"
        >
          <FaPinterest size={25} />
        </a>
      )}

      {socialLinks.spotify && (
        <a
          href={`https://open.spotify.com/user/${socialLinks.spotify}`}
          target="_blank"
        >
          <FaSpotify size={25} />
        </a>
      )}

      {socialLinks.etsy && (
        <a
          href={`https://www.etsy.com/shop/${socialLinks.etsy}`}
          target="_blank"
        >
          <FaEtsy size={25} />
        </a>
      )}

      {socialLinks.discord && (
        <a
          href={`https://discord.com/users/${socialLinks.discord}`}
          target="_blank"
        >
          <FaDiscord size={25} />
        </a>
      )}

      {socialLinks.snapchat && (
        <a
          href={`https://www.snapchat.com/add/${socialLinks.snapchat}`}
          target="_blank"
        >
          <FaSnapchat size={25} />
        </a>
      )}

      {socialLinks.twitch && (
        <a href={`https://www.twitch.tv/${socialLinks.twitch}`} target="_blank">
          <FaTwitch size={25} />
        </a>
      )}

      {socialLinks.vimeo && (
        <a href={`https://vimeo.com/${socialLinks.vimeo}`} target="_blank">
          <FaVimeo size={25} />
        </a>
      )}

      {socialLinks.email && (
        <a href={`mailto:${socialLinks.email}`}>
          <MdEmail size={25} />
        </a>
      )}

      {socialLinks.website && (
        <a href={socialLinks.website} target="_blank">
          <FaLink size={20} />
        </a>
      )}
    </div>
  );
}
