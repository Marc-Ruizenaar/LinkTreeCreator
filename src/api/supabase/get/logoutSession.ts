import { createClient } from "@/utils/supabase/client";

export default async function logoutSession() {
  const supabase = createClient();

  const { error } = await supabase.auth.signOut();
  if (error) console.error("Logout failed:", error);
}
