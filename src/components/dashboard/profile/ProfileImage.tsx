import { useRef, useState } from "react";
import Image from "next/image";
import { MdEdit } from "react-icons/md";
import profilePictureBucket from "@/api/supabase/push/profilePictureBucket";
import profilePictureDatabase from "@/api/supabase/push/profilePictureDatabase";
import { useStoreProfile } from "@/context/StoreProviderContext";

export default function ProfileImage() {
  const { store, setStore } = useStoreProfile();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleProfileChange = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      setError(null);

      // Upload and get the new URL
      const newImageUrl = await profilePictureBucket(file, "profile-pic");
      const fullUrl =
        "https://metqjkrlpcpouafgrdsr.supabase.co/storage/v1/object/public/" +
        newImageUrl.fullPath;

      await profilePictureDatabase(fullUrl, store?.user_id);

      // Update global context with new image
      if (fullUrl) {
        setStore((prevUser) =>
          prevUser ? { ...prevUser, profilePicture: fullUrl } : null,
        );
      }
    } catch (err) {
      setError("Failed to upload image.");
      console.error("Upload error:", err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="relative w-max">
      {error && (
        <div className="absolute -top-8 left-0 right-0 text-sm text-red-500">
          {error}
        </div>
      )}

      <div className={`relative ${isUploading ? "opacity-50" : ""}`}>
        {store?.profilePicture ? (
          <Image
            className="aspect-square rounded-full object-cover"
            src={store.profilePicture || "/default-avatar.png"}
            alt="Profile Picture"
            width={100}
            height={100}
          />
        ) : (
          <p className="flex h-[100px] w-[100px] items-center justify-center rounded-full bg-blue-600 text-4xl font-bold text-white">M</p>
        )}

        {isUploading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
          </div>
        )}
      </div>

      <button
        onClick={handleProfileChange}
        disabled={isUploading}
        className="absolute bottom-0 right-0 rounded-full bg-blue-500 p-1 disabled:bg-blue-300"
      >
        <MdEdit fill="white" />
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
