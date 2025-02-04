"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function MainHeader() {
  const [mobilePopup, setMobilePopup] = useState(false);

  const pathname = usePathname();
  const menuLinks = [
    {
      href: "/",
      text: "Home",
    },
    {
      href: "/about",
      text: "Our Mission",
    },
  ];

  return (
    <div className="bg-BlueMain relative">
      <nav className="container mx-auto flex items-center justify-between px-5 py-8">
        <div className="z-10 flex gap-10">
          <Link href={"/"}>
            <Image alt="" src={"/stan_logo.svg"} height={26} width={80} />
          </Link>

          <ul className="hidden items-center gap-8 text-lg font-bold md:flex">
            {menuLinks.map((link) => (
              <li key={link.text}>
                <Link
                  href={link.href}
                  className={
                    pathname === link.href
                      ? "text-white"
                      : "text-TextGray transition-all hover:text-white hover:transition-all"
                  }
                >
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-center">
          <div className="hidden md:block">
            <Link
              className="rounded-xl px-5 py-3 font-bold text-white"
              href={"/login"}
            >
              Log in
            </Link>
            <Link
              className="text-BlueDarkMain rounded-xl bg-white px-5 py-3 font-bold"
              href={"/register"}
            >
              Sign Up
            </Link>
          </div>

          <div className="relative z-10 md:hidden">
            <button
              onClick={() => setMobilePopup(true)}
              className={`${mobilePopup === false ? "relative" : "hidden"} flex flex-col gap-1`}
            >
              <span className="h-[2px] w-5 bg-white"></span>
              <span className="h-[2px] w-5 bg-white"></span>
              <span className="h-[2px] w-5 bg-white"></span>
            </button>

            <div className={`${mobilePopup === false ? "hidden" : "relative"}`}>
              <button
                onClick={() => setMobilePopup(false)}
                className="text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>

        <div
          className={`${
            mobilePopup === false ? "hidden" : "absolute"
          } bg-BlueMain left-0 right-0 top-0 flex h-[calc(100vh-64px)] w-screen items-center justify-end p-10 text-end`}
        >
          <ul className="flex flex-col gap-4 text-4xl font-bold">
            {menuLinks.map((link) => (
              <li key={link.text}>
                <Link
                  href={link.href}
                  className={
                    pathname === link.href
                      ? "text-white"
                      : "text-TextGray transition-all hover:text-white hover:transition-all"
                  }
                >
                  {link.text}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/login"
                className="text-TextGray transition-all hover:text-white hover:transition-all"
              >
                Log in
              </Link>
            </li>
            <li>
              <Link
                href="/register"
                className="text-TextGray transition-all hover:text-white hover:transition-all"
              >
                Sign Up
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
