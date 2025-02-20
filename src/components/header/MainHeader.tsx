"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { User } from "@supabase/supabase-js";

export default function MainHeader() {
  const [mobilePopup, setMobilePopup] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  useEffect(() => {
    // Check if user is logged in
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      // If user is logged redirect to dashboard
      if (session?.user) {
        setUser(session.user);
        if (pathname === "/login" || pathname === "/register") {
          router.replace("/dashboard");
        }
      }
    };

    checkUser();

    // Set up auth state change listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser(session.user);
        if (pathname === "/login" || pathname === "/register") {
          router.replace("/dashboard");
        }
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, [pathname, router, supabase]);

  const menuLinks = [
    {
      href: "/",
      text: "Home",
    },
  ];

  return (
    <div className="relative bg-BlueMain">
      <nav className="container mx-auto flex items-center justify-between px-5 py-8">
        <div className="z-10 flex gap-10">
          <Link href={"/"}>
            <Image alt="" src={"/logo.svg"} height={26} width={120} />
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
            {!user ? (
              <>
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
              </>
            ) : (
              <Link
                className="rounded-xl px-5 py-3 font-bold text-white"
                href={"/dashboard"}
              >
                Dashboard
              </Link>
            )}
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
          } left-0 right-0 top-0 flex h-[calc(100vh-64px)] w-screen items-center justify-end bg-BlueMain p-10 text-end`}
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
            {!user ? (
              <>
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
              </>
            ) : (
              <li>
                <Link
                  href="/dashboard"
                  className="text-TextGray transition-all hover:text-white hover:transition-all"
                >
                  Dashboard
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}
