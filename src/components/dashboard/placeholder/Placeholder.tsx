"use client";
import SignOut from "@/components/dashboard/SignOut";
import { useUserProfile } from "@/context/UserProfileContext";

export default function Placeholder() {
  const { user } = useUserProfile();

  return (
    <main className="flex flex-col p-20 gap-4">
      <div>
        <h1 className="text-2xl font-bold">Hey  {user ? user.name : "there"},</h1>
        <h2>follow these steps and get your page ready!</h2>
      </div>

      <h2>Store Launch Checklist</h2>
      <p>0/4 tasks completed</p>

      <SignOut />
    </main>
  );
}
