import { useStoreProfile } from "@/context/StoreProviderContext";
import { Store } from "@/types/profile";
import Image from "next/image";

export default function PhoneUserData({ displayname, bio }: Store) {
  const { store } = useStoreProfile();

  return (
    <div className="flex flex-col items-center gap-3">
      {store?.profilePicture ? (
        <Image
          className="rounded-full h-24 w-24 object-cover"
          src={store.profilePicture || "/default-avatar.png"}
          alt=""
          width={100}
          height={100}
        />
      ) : (
        <p className="flex h-[100px] w-[100px] items-center justify-center rounded-full bg-blue-600 text-4xl font-bold text-white">
          M
        </p>
      )}

      <h2 className="text-2xl font-bold">{displayname}</h2>
      <p>{bio}</p>
    </div>
  );
}
