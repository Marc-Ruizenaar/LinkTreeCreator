import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function GetUser(userKey) {
  const supabase = await createClient();

  const { data: userData, error: userError } = await supabase
    .from("users")
    .select("*")
    .eq("user_id", userKey.user.id);
  if (userError || !userData) {
    redirect("/login");
  }

  return userData;
}
