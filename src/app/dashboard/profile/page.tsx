"use client";
import PhoneSimulator from "@/components/dashboard/stores/phonesimulator/PhoneSimulator";
import ProfileForm from "@/components/dashboard/profile/ProfileForm";

export default function Profile() {
  return (
    <main className="p-8">
      <div className="flex flex-col md:flex-row gap-5">
        <ProfileForm />
        <PhoneSimulator />
      </div>
    </main>
  );
}
