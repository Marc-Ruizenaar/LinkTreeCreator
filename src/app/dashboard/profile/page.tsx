"use client";
import PhoneSimulator from "@/components/dashboard/stores/phonesimulator/PhoneSimulator";
import ProfileForm from "@/components/dashboard/profile/ProfileForm";

export default function Profile() {
  return (
    <main className="p-8">
      <div className="flex gap-5">
        <ProfileForm />
        <PhoneSimulator />
      </div>
    </main>
  );
}
