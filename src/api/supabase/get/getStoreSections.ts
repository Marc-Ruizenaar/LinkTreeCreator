import { createClient } from "@/utils/supabase/server";

export default async function GetStoreSections(userKey) {
  const supabase = await createClient();

  const { data: storeSectionData } = await supabase
    .from("stores_sections")
    .select("*")
    .eq("user_id", userKey.user.id);
  if (!storeSectionData) {
    return null;
  }

  return storeSectionData;
}
