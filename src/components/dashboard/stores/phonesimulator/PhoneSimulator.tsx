import PhoneUserData from "./PhoneUserData";
import PhoneSections from "./PhoneSections";
import { useStoreProfile } from "@/context/StoreProviderContext";
import PhoneLayout from "./PhoneLayout";
import SocialMediaIcons from "../../profile/SocialMediaIcons";

export default function PhoneSimulator() {
  const { store } = useStoreProfile();

  const displayname = store?.displayname || "";
  const bio = store?.bio || "";
  const profilePicture = store?.profilePicture || "";

  return (
    <PhoneLayout>
      <PhoneUserData
        displayname={displayname}
        bio={bio}
        profilePicture={profilePicture}
      />

      <SocialMediaIcons addSpacing={true} createLink={true} />

      <PhoneSections />
    </PhoneLayout>
  );
}
