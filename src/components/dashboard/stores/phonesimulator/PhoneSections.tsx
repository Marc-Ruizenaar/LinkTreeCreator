import { useStoreSections } from "@/context/StoreSectionsProviderContext";
import { useUserProfile } from "@/context/UserProfileContext";
import Image from "next/image";
import Link from "next/link";

export default function PhoneSections() {
  const { sections } = useStoreSections();

  return (
    <div className="flex w-full flex-col gap-5">
      {sections ? (
        sections.map((section) => (
          <div
            key={section.id}
            className="shadow-section rounded-xl bg-white p-4"
          >
            <div className="flex items-center gap-4 text-left">
              <Image
                className="rounded-xl"
                src={section.imageSrc}
                alt=""
                width={50}
                height={50}
              />
              <div>
                <h3 className="font-bold">{section.title}</h3>
                <p className="text-sm">{section.subTitle}</p>
              </div>
            </div>

            <Link
              className="mt-4 block w-full rounded-xl bg-blue-600 px-5 py-3 font-bold text-white"
              href={"/"}
            >
              Click me!
            </Link>
          </div>
        ))
      ) : (
        <div className="mt-10 rounded-full bg-slate-200 px-5 py-3 font-semibold">
          <p>New Section</p>
        </div>
      )}
    </div>
  );
}
