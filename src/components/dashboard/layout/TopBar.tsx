"use client";
import { usePathname, useParams } from "next/navigation";
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useUserProfile } from "@/context/UserProfileContext";
import Image from "next/image";

export default function TopBar() {
  const { user } = useUserProfile();
  const pathname = usePathname();
  const params = useParams();

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
        if (pathname.startsWith("/dashboard/store/section/") && params.id) {
          return {
            href: "/dashboard/store",
            text: "Store",
            title: `Store / Section ${params.id}`,
          };
        }
        return null;
    }
  };

  const backLink = getBackLink();

  // Dynamically generate the page title
  const generatePageTitle = () => {
    if (pathname === "/dashboard") return "Home";
    if (pathname === "/dashboard/store") return "My Store";
    if (pathname.startsWith("/dashboard/store/section/") && params.id)
      return `Section ${params.id}`;

    // Extract last segment dynamically and capitalize it
    const pathSegments = pathname.split("/").filter(Boolean);
    const lastSegment = pathSegments[pathSegments.length - 1] || "Page";
    return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);
  };

  return (
    <section className="flex w-full items-center justify-between border-b-2 border-gray-100 px-8 py-5">
      <Link className="block md:hidden" href={"/dashboard"}>
        <Image
          alt=""
          src={"/logo_black.svg"}
          className="h-full w-24"
          height={32}
          width={100}
        />
      </Link>

      <div className="items-center gap-2 md:flex">
        {backLink ? (
          <Link
            href={backLink.href}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <FaArrowLeftLong size={20} />
            <span className="hidden text-xl font-bold">
              {backLink.text} /{" "}
              <span className="text-gray-500">
                {backLink.title.split(" / ")[1]}
              </span>
            </span>
          </Link>
        ) : (
          <h2 className="text-xl font-bold">{generatePageTitle()}</h2>
        )}
      </div>

      <Link
        target="_blank"
        href={`${process.env.NEXT_PUBLIC_BASE_URL}/${user?.username}`}
        className="hidden text-gray-600 hover:text-gray-900 md:block"
      >
        {`${process.env.NEXT_PUBLIC_BASE_URL}/${user?.username}`}
      </Link>

      <Link
        target="_blank"
        href={`${process.env.NEXT_PUBLIC_BASE_URL}/${user?.username}`}
        className="block text-gray-600 hover:text-gray-900 md:hidden"
      >
        Check store
      </Link>
    </section>
  );
}
