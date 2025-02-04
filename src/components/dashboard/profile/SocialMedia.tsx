import Image from "next/image";
import { useState } from "react";
import { SocialMediaProps } from "@/types/profile";

export default function SocialMediaInput({
  instagram,
  tiktok,
  socialLinks,
  onInputChange,
}: SocialMediaProps) {
  const [showMoreSocial, setShowMoreSocial] = useState(false);

  return (
    <>
      <h2 className="text-xl font-bold">Social Links (URL)</h2>

      <div className="flex items-center gap-2">
        <Image
          src={"/social-media/instagram.svg"}
          alt="Instagram"
          width={40}
          height={40}
        />
        <p>@</p>
        <input
          className="input-field"
          type="text"
          id="instagram"
          name="instagram"
          value={instagram}
          onChange={onInputChange}
        />
      </div>

      <div className="flex items-center gap-2">
        <Image
          src={"/social-media/tiktok.svg"}
          alt="TikTok"
          width={40}
          height={40}
        />
        <p>@</p>
        <input
          className="input-field"
          type="text"
          id="tiktok"
          name="tiktok"
          value={tiktok}
          onChange={onInputChange}
        />
      </div>

      <button
        type="button"
        onClick={() => setShowMoreSocial((prev) => !prev)}
        className="w-max rounded-md bg-blue-500 px-4 py-2 text-white"
      >
        {showMoreSocial ? "Hide More Social Media" : "More Social Media"}
      </button>

      {showMoreSocial && (
        <div className="mt-4 flex flex-col gap-4">
          {Object.entries(socialLinks).map(([platform, value]) => (
            <div key={platform} className="flex items-center gap-2">
              <Image
                src={`/social-media/${platform}.svg`}
                alt={platform}
                width={40}
                height={40}
              />
              <input
                className="input-field flex-1"
                type="text"
                id={platform}
                name={platform}
                value={value}
                onChange={onInputChange}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
