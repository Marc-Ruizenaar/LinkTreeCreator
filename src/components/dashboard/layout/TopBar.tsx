"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useStoreProfile } from "@/context/StoreProviderContext";

export default function TopBar() {
  const pathname = usePathname();
  const { store } = useStoreProfile();

  const getBackLink = () => {
    switch (pathname) {
      case "/dashboard/profile":
        return {
          href: "/dashboard/store",
          text: "My Store",
          title: "My Store / Profile",
        };
      case "/dashboard/store/profile":
        return {
          href: "/dashboard/store",
          text: "Stores",
          title: "Edit Store",
        };
      default:
        return null;
    }
  };

  const backLink = getBackLink();

  return (
    <section className="flex w-full justify-between border-b-2 border-gray-100 px-8 py-5">
      <div className="flex items-center gap-2">
        {backLink ? (
          <Link
            href={backLink.href}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <FaArrowLeftLong size={20} />
            <span className="text-xl font-bold">
              {backLink.text} /{" "}
              <span className="text-gray-500">
                {backLink.title.split(" / ")[1]}
              </span>
            </span>
          </Link>
        ) : (
          <h2 className="text-xl font-bold">
            {pathname === "/dashboard"
              ? "Home"
              : pathname === "/dashboard/store"
                ? "My Store"
                : "Page"}
          </h2>
        )}
      </div>

      <Link
        target="_blank"
        href={`http://localhost:3000/${store?.displayname}`}
        className="text-gray-600 hover:text-gray-900"
      >
        localhost:3000/{store?.displayname}
      </Link>
    </section>
  );
}
