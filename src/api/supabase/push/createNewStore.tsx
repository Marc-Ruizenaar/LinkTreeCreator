import { createClient } from "@/utils/supabase/client";

export async function createNewStore() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    console.error("User not found");
    return null;
  }

  const { data } = await supabase
    .from("users")
    .select("*")
    .eq("user_id", user.id);

  if (!data) {
    console.error("User not found");
    return null;
  }

  const displayname = data[0].displayname;

  const { data: newStore } = await supabase
    .from("stores")
    .insert({
      user_id: user.id,
      displayname: displayname,
    })
    .select();

  return newStore;
}
