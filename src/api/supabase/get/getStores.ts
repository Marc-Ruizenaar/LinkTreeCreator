import { createClient } from "@/utils/supabase/client";

export default async function getStoresData(user_id: string) {
  const supabase = await createClient();

  const { data: storeData } = await supabase
    .from("stores")
    .select("*")
    .eq("user_id", user_id);

  if (!storeData) {
    return null;
  }

  return storeData;
}
