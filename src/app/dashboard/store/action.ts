import { createClient } from "@/utils/supabase/client";

export async function getStores() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    console.error("User not found");
    return null;
  }

  console.log("User ID:", user.id);

  const { data, error } = await supabase
    .from("stores")
    .select("*")
    .eq("user_id", user.id);

  if (error) {
    console.error("Error fetching stores:", error);
    return null;
  }

  console.log("Fetched stores:", data);
  return data;
}

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

    console.log("User data", data);

  if (!data) {
    console.error("User not found");
    return null;
  }

  const name = data[0].name;
  const displayname = data[0].displayname;

  const { error } = await supabase.from("stores").insert({
    user_id: user.id,
    name: name,
    displayname: displayname,
  });

  console.log(error);
}
