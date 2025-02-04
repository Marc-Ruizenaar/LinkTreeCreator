import { createClient } from "@/utils/supabase/server";

export default async function GetStores(userKey) {
  const supabase = await createClient();

  const { data: storeData } = await supabase
    .from("stores")
    .select("*")
    .eq("user_id", userKey.user.id);

  if (!storeData) {
    return null;
  }

  return storeData;
}
