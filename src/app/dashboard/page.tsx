"use client";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <main className="flex flex-col gap-5 p-8">
      <h1 className="font-bold text-2xl">Welcome to your personal site! 🚀</h1>
      <p>
        Manage and customize your bio link with ease. Track clicks, optimize
        engagement, and make the most out of every link you share!
      </p>
      <Link className="block w-max rounded-xl bg-blue-600 px-5 py-3 font-bold text-white" href={"/dashboard/store"}>Go to your store</Link>
    </main>
  );
}
