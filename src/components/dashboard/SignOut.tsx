'use client';
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function SignOutButton() {
  const router = useRouter();
  
  const handleSignOut = async () => {
    const supabase = createClient();
    
    const { error } = await supabase.auth.signOut();
    if (!error) {
      router.refresh();
      router.push('/');
    }
  };

  return (
    <button
      onClick={handleSignOut}
      className="px-4 py-2 w-max bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
    >
      Sign Out
    </button>
  );
}