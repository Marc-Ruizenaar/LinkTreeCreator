import { createClient } from "@/utils/supabase/client";

export async function createNewSection(user_id: string) {
  const supabase = await createClient();

  const { data } = await supabase
    .from("stores_sections")
    .insert({
      imageSrc: "/placeholder.jpg",
      title: "Check it out!",
      subTitle: "Visit my Affiliate Link",
      buttonText: "Click Me!",
      buttonStyle: "1",
      user_id
    })
    .select();

  return data;
}
