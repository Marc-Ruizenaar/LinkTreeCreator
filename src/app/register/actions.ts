"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function signup(formData: FormData) {
  const supabase = await createClient();

  // User data auth
  const { error: authError, data } = await supabase.auth.signUp({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    options: {
      data: {
        username: formData.get("username") as string,
        name: formData.get("name") as string,
      },
    },
  });

  // Error handling
  if (authError) {
    if (authError.code === "user_already_exists") {
      return { error: "Email already exists" };
    }
    console.error("Auth error:", authError);
    return { error: "An error occurred during registration." };
  }

  // Create user in database
  const { } = await supabase.from("users").insert({
    name: formData.get("name") as string,
    username: formData.get("username") as string,
    email: formData.get("email") as string,
    user_id: data?.user?.id,
  });

  revalidatePath("/", "layout");
  redirect("/dashboard");
}
