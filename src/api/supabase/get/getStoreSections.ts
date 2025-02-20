import { createClient } from "@/utils/supabase/server";

export default async function GetStoreSections(user_id: string) {
  const supabase = await createClient();

  const { data: storeSectionData } = await supabase
    .from("stores_sections")
    .select("*")
    .eq("user_id", user_id);
  if (!storeSectionData) {
    return null;
  }

  return storeSectionData;
}
