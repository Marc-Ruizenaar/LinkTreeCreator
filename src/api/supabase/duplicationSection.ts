import { createClient } from "@/utils/supabase/client";

export default async function duplicationSection(section_id: string) {
  const supabase = createClient();

  // Get data based on section id
  const { error: fetchDataError, data } = await supabase
    .from("stores_sections")
    .select()
    .eq("id", section_id);

  if (fetchDataError) {
    console.error("Error updating store profile:", fetchDataError);
    throw fetchDataError;
  }

  // Remove id and created_at so Supabase can recreate it
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const newData = data.map(({ id, created_at, ...rest }) => ({ ...rest }));

  // Insert new data
  const { error: insertDataError, data: insertData } = await supabase
    .from("stores_sections")
    .insert(newData)
    .select();

  if (insertDataError) {
    console.error("Error updating store profile:", insertDataError);
    throw insertDataError;
  }

  return insertData;
}
