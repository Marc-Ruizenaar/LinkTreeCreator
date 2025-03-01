import Image from "next/image";
import { useState } from "react";
import { SocialMediaProps } from "@/types/profile";

export default function SocialMediaInput({ onInputChange, socialLinks }: SocialMediaProps) {
  const [showMoreSocial, setShowMoreSocial] = useState(false);

  const visibleSocials = socialLinks.slice(0, 2) || [];
  const hiddenSocials = socialLinks.slice(2) || [];

  return (
    <>
      <h2 className="text-xl font-bold">Social Links (URL)</h2>

      {/* Initially display the first 2 social links */}
      <div className="mt-4 flex flex-col gap-4">
        {visibleSocials.map((social) => (
          <div key={social.platform} className="flex items-center gap-2">
            <Image
              src={`/social-media/${social.platform}.svg`}
              alt={social.platform}
              width={40}
              height={40}
            />
            <input
              className="input-field flex-1"
              type="text"
              id={social.platform}
              name={social.platform}
              value={social.link}
              onChange={onInputChange}
            />
          </div>
        ))}
      </div>

      {socialLinks.length > 2 && (
        <button
          type="button"
          onClick={() => setShowMoreSocial((prev) => !prev)}
          className="w-max rounded-md bg-blue-500 px-4 py-2 text-white"
        >
          {showMoreSocial ? "Hide More Social Media" : "More Social Media"}
        </button>
      )}

      {showMoreSocial && (
        <div className="mt-4 flex flex-col gap-4">
          {hiddenSocials.map((social) => (
            <div key={social.platform} className="flex items-center gap-2">
              <Image
                src={`/social-media/${social.platform}.svg`}
                alt={social.platform}
                width={40}
                height={40}
              />
              <input
                className="input-field flex-1"
                type="text"
                id={social.platform}
                name={social.platform}
                value={social.link}
                onChange={onInputChange}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
