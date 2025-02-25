import { Sections } from "@/types/profile";
import Image from "next/image";
import Link from "next/link";

export default function SectionPhone({
  href,
  title,
  subTitle,
  buttonText,
  imageSrc,
  buttonStyle,
}: Sections) {
  switch (buttonStyle) {
    case 1:
      return (
        <div className="relative h-full w-[400px]">
          <div className="no-scrollbar sticky top-10 flex h-[600px] w-full flex-col items-center justify-center gap-4 overflow-hidden overflow-y-auto rounded-2xl border-4 border-black p-4 py-8 text-center">
            <div className="shadow-section w-full rounded-xl bg-white p-4">
              <div className="flex items-center gap-4 text-left">
                <Image
                  className="h-14 w-14 rounded-xl object-cover"
                  src={imageSrc || "/placeholder.jpg"}
                  alt=""
                  width={50}
                  height={50}
                />
                <div>
                  <h3 className="font-bold">{title}</h3>
                  {subTitle && <p className="text-sm">{subTitle}</p>}
                </div>
              </div>
              {buttonText && (
                <Link
                  href={href || "/"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 block w-full rounded-xl bg-blue-600 px-5 py-3 text-center font-bold text-white"
                >
                  {buttonText}
                </Link>
              )}
            </div>
          </div>
        </div>
      );

    case 2:
      return (
        <div className="relative h-full w-[400px]">
          <div className="no-scrollbar sticky top-10 flex h-[600px] w-full flex-col items-center justify-center gap-4 overflow-hidden overflow-y-auto rounded-2xl border-4 border-black p-4 py-8 text-center">
            <Link
              href={href || "/"}
              target="_blank"
              rel="noopener noreferrer"
              className="shadow-section w-full rounded-xl bg-white p-4"
            >
              <div className="flex items-center gap-4 text-left">
                <Image
                  className="h-14 w-14 rounded-xl object-cover"
                  src={imageSrc || "/placeholder.jpg"}
                  alt=""
                  width={50}
                  height={50}
                />
                <div>
                  <h3 className="font-bold">{title}</h3>
                  {subTitle && (
                    <p className="break-all text-sm">{subTitle}</p>
                  )}
                </div>
              </div>
            </Link>
          </div>
        </div>
      );

    case 3:
      return (
        <div className="relative h-full w-[400px]">
          <div className="no-scrollbar sticky top-10 flex h-[600px] w-full flex-col items-center justify-center gap-4 overflow-hidden overflow-y-auto rounded-2xl border-4 border-black p-4 py-8 text-center">
            <section className="shadow-section w-full rounded-xl bg-white p-4">
              <div className="flex items-center gap-4 text-left">
                <Image
                  className="h-14 w-14 rounded-xl object-cover"
                  src={imageSrc || "/placeholder.jpg"}
                  alt=""
                  width={50}
                  height={50}
                />
                <div>
                  <h3 className="font-bold">{title}</h3>
                  {subTitle && <p className="text-sm">{subTitle}</p>}
                </div>
              </div>
              {buttonText && (
                <Link
                  href={href || "/"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 block w-full rounded-xl bg-blue-600 px-5 py-3 text-center font-bold text-white"
                >
                  {buttonText}
                </Link>
              )}
            </section>
          </div>
        </div>
      );

    default:
      return null;
  }
}
