import { createClient } from "@/utils/supabase/client";

export default async function SectionPictureBucket(file: File, fileName: string) {
  const supabase = createClient();

  console.log(file);

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError) throw userError;

  // Create filepath using user ID as folder and UUID as filename
  const fileExt = file.name.split(".").pop();
  const uniqueId = `${fileName}-${Date.now()}`;
  const filePath = `${user?.id}/${uniqueId}.${fileExt}`;

  // Remove existing files with proper error handling
  const { data: existingFiles, error: listError } = await supabase.storage
    .from("sections")
    .list(user?.id);

  if (!listError && existingFiles) {
    const deletePaths = existingFiles
      .filter((file) => file.name.startsWith(fileName))
      .map((file) => `${user?.id}/${file.name}`);

    if (deletePaths.length > 0) {
      await supabase.storage.from("sections").remove(deletePaths);
    }
  }

  // Upload new file
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from("sections")
    .upload(filePath, file, {
      upsert: true,
    });

  if (uploadError) throw uploadError;

  return uploadData;
}
