import { Sections } from "@/types/profile";
import { createClient } from "@/utils/supabase/client";

export default async function sectionUpdate(updatedSection: Sections, id: string) {

  const supabase = createClient();
  const dataSection = updatedSection;

  const { buttonStyle, buttonText, href, subTitle, title } = dataSection;

  const { error } = await supabase
    .from("stores_sections")
    .update({
      buttonStyle,
      buttonText,
      href,
      subTitle,
      title,
    })
    .eq("id", id);

  if (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
}
