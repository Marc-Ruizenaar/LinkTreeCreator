import { useStoreProfile } from "@/context/StoreProviderContext";
import { UserProfile } from "@/types/profile";
import Image from "next/image";

export default function PhoneUserData({ displayname, bio }: UserProfile) {
  const { store } = useStoreProfile();

  return (
    <div className="flex flex-col items-center gap-3">
      <Image
        className="rounded-full"
        src={store?.profilePicture || "/default-avatar.png"}
        alt=""
        width={100}
        height={100}
      />

      <h2 className="text-2xl font-bold">{displayname}</h2>
      <p>{bio}</p>
    </div>
  );
}
