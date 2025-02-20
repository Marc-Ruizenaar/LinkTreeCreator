import { useStoreSections } from "@/context/StoreSectionsProviderContext";
import Image from "next/image";
import Link from "next/link";

export default function PhoneSections() {
  const { sections } = useStoreSections();

  if (!sections) {
    return (
      <div className="flex w-full flex-col gap-5">
        <div className="mt-10 rounded-full bg-slate-200 px-5 py-3 font-semibold">
          <p>New Section</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-5">
      {sections.map((section) => {
        switch (section.buttonStyle) {
          case 1:
            return (
              <div
                key={section.id}
                className="shadow-section w-full rounded-xl bg-white p-4"
              >
                <div className="flex items-center gap-4 text-left">
                  <Image
                    className="h-14 w-14 rounded-xl object-cover"
                    src={section.imageSrc || "/placeholder.jpg"}
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
                  href={section.href ?? "/"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 block w-full rounded-xl bg-blue-600 px-5 py-3 font-bold text-white text-center"
                >
                  {section.buttonText}
                </Link>
              </div>
            );
          case 2:
            return (
              <Link
                key={section.id}
                href={section.href ?? "/"}
                target="_blank"
                rel="noopener noreferrer"
                className="shadow-section w-full rounded-xl bg-white p-4"
              >
                <div className="flex items-center gap-4 text-left">
                  <Image
                    className="h-14 w-14 rounded-xl object-cover"
                    src={section.imageSrc || "/placeholder.jpg"}
                    alt=""
                    width={50}
                    height={50}
                  />
                  <div>
                    <h3 className="font-bold">{section.title}</h3>
                    <p className="text-sm">{section.subTitle}</p>
                  </div>
                </div>
              </Link>
            );
          case 3:
            return (
              <section
                key={section.id}
                className="shadow-section w-full rounded-xl bg-white p-4"
              >
                <div className="flex items-center gap-4 text-left">
                  <Image
                    className="h-14 w-14 rounded-xl object-cover"
                    src={section.imageSrc || "/placeholder.jpg"}
                    alt=""
                    width={50}
                    height={50}
                  />
                  <div>
                    <h3 className="font-bold">{section.title}</h3>
                    <p className="text-sm">{section.subTitle}</p>
                  </div>
                </div>
                {section.buttonText && (
                  <Link
                    href={section.href ?? "/"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 block w-full rounded-xl bg-blue-600 px-5 py-3 font-bold text-white text-center"
                  >
                    {section.buttonText}
                  </Link>
                )}
              </section>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}