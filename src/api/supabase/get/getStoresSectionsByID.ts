import { createClient } from "@/utils/supabase/server";

export async function getStoresSectionsByID(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("stores_sections")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching store section:", error);
    return null;
  }

  return data;
}
