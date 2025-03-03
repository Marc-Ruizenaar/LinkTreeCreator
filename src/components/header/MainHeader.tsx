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

  // Scroll disabled when popup is open
  useEffect(() => {
    if (mobilePopup) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [mobilePopup]);

  return (
    <div className="relative bg-BlueMain">
      <nav className="container mx-auto flex items-center justify-between px-5 py-8">
        <div className="z-20 flex gap-10">
          <Link href={"/"}>
            <Image alt="" src={"/logo.svg"} height={26} width={120} />
          </Link>
        </div>

        <div className="flex justify-center z-20">
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

          <div className="relative md:hidden">
            <button
              onClick={() => setMobilePopup(true)}
              className={`${mobilePopup === false ? "relative" : "hidden"} flex flex-col gap-1`}
            >
              <span className="h-[2px] w-5 bg-white"></span>
              <span className="h-[2px] w-5 bg-white"></span>
              <span className="h-[2px] w-5 bg-white"></span>
            </button>

            <div className={`z-20 ${mobilePopup === false ? "hidden" : "relative"}`}>
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
          } left-0 right-0 top-0 flex h-screen w-full z-10 items-center justify-end bg-BlueMain p-10 text-end`}
        >
          <ul className="flex flex-col gap-4 text-4xl font-bold">
            {!user ? (
              <>
                <li>
                  <Link
                    href="/login"
                    className="text-white transition-all hover:text-white hover:transition-all"
                  >
                    Log in
                  </Link>
                </li>
                <li>
                  <Link
                    href="/register"
                    className="text-white transition-all hover:text-white hover:transition-all"
                  >
                    Sign Up
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <Link
                  href="/dashboard"
                  className="text-white transition-all hover:text-white hover:transition-all"
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
