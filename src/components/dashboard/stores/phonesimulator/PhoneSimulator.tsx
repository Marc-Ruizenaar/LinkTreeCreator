import PhoneSocials from "./PhoneSocials";
import PhoneUserData from "./PhoneUserData";
import PhoneSections from "./PhoneSections";
import { SocialMediaLinks } from "@/types/profile";

interface userInfo {
  displayname: string;
  bio: string;
  instagram: string;
  tiktok: string;
  socialLinks: SocialMediaLinks;
}

export default function PhoneSimulator({
  displayname,
  bio,
  instagram,
  tiktok,
  socialLinks,
}: userInfo) {
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
