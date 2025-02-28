import { MyProfile } from "@/types/profile";
import { createClient } from "@/utils/supabase/client";

export default async function updateUsers(newUserInfo: MyProfile, id: string) {
  const supabase = createClient();

  const name = newUserInfo.name;
  const username = newUserInfo.username;
  const email = newUserInfo.email;
  const phonenumber = newUserInfo.phonenumber;

  const { error } = await supabase
    .from("users")
    .update({
      name: name,
      username: username,
      email: email,
      phonenumber: phonenumber,
    })
    .eq("id", id);

  if (error) {
    console.error(error);
  }
}
