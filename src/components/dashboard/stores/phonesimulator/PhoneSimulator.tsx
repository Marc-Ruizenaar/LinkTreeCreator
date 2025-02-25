import PhoneSocials from "./PhoneSocials";
import PhoneUserData from "./PhoneUserData";
import PhoneSections from "./PhoneSections";
import { useStoreProfile } from "@/context/StoreProviderContext";

export default function PhoneSimulator() {
  const { store } = useStoreProfile();

  const displayname = store?.displayname || "";
  const bio = store?.bio || "";
  const instagram = store?.instagram || "";
  const tiktok = store?.tiktok || "";

    const socialLinks = ({
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
    });

  return (
    <div className="no-scrollbar flex aspect-[1/2] h-full w-[450px] flex-col items-center gap-4 overflow-hidden overflow-y-auto rounded-2xl border-4 border-black p-4 py-8 text-center">
      <PhoneUserData displayname={displayname} bio={bio} />

      <PhoneSocials
        instagram={instagram}
        tiktok={tiktok}
        socialLinks={socialLinks}
      />

      <PhoneSections />
    </div>
  );
}
