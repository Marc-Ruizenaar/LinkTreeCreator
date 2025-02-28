import PhoneSocials from "./PhoneSocials";
import PhoneUserData from "./PhoneUserData";
import PhoneSections from "./PhoneSections";
import { useStoreProfile } from "@/context/StoreProviderContext";
import PhoneLayout from "./PhoneLayout";

export default function PhoneSimulator() {
  const { store } = useStoreProfile();

  const displayname = store?.displayname || "";
  const bio = store?.bio || "";
  const profilePicture = store?.profilePicture || "";
  const instagram = store?.instagram || "";
  const tiktok = store?.tiktok || "";

  const socialLinks = {
    email: store?.email || "",
    facebook: store?.facebook || "",
    youtube: store?.youtube || "",
    website: store?.website || "",
    pinterest: store?.pinterest || "",
    linkedin: store?.linkedin || "",
    x: store?.x || "",
    spotify: store?.spotify || "",
    applePodcast: store?.applePodcast || "",
    etsy: store?.etsy || "",
    discord: store?.discord || "",
    snapchat: store?.snapchat || "",
    twitch: store?.twitch || "",
    vimeo: store?.vimeo || "",
  };

  return (
    <PhoneLayout>
      <PhoneUserData displayname={displayname} bio={bio} profilePicture={profilePicture} />

      <PhoneSocials
        instagram={instagram}
        tiktok={tiktok}
        socialLinks={socialLinks}
      />

      <PhoneSections />
    </PhoneLayout>
  );
}
