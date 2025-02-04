import { createClient } from "@/utils/supabase/client";

export default async function updateUsers(newUserInfo, id) {
  const supabase = createClient();

  const name = newUserInfo.name;
  const username = newUserInfo.userName;
  const email = newUserInfo.email;
  const phone = newUserInfo.phone;

  const { error } = await supabase
    .from("users")
    .update({
      name: name,
      displayname: username,
      email: email,
      phonenumber: phone,
    })
    .eq("id", id);

  if (error) {
    console.error(error);
  }
}
