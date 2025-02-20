import { createClient } from "@/utils/supabase/client";

interface Position {
  id: string | undefined;
  user_id: string | undefined;
  position: number;
}

export default async function updateSectionPositions(updates: Position[]) {
  const supabase = createClient();

  if (!updates) {
    console.error("No updates provided.");
    return;
  }

  const { data, error } = await supabase
    .from("stores_sections")
    .upsert(updates)
    .select();

  if (error) {
    console.error("Error updating section positions:", error);
    throw error;
  }

  return { success: true, updatedData: data };
}
