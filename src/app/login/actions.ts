"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function login(formData: FormData) {
  const supabase = await createClient();

  const { error: authError } = await supabase.auth.signInWithPassword({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  if (authError) {
    if (authError.code === "invalid_credentials") {
      return { error: "Invalid login credentials" };
    }
    console.error("Auth error:", authError);
    return { error: "An error occurred during registration." };
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}
