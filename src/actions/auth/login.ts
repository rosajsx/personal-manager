"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { z } from "zod";

const schema = z.object({
  email: z.string({ invalid_type_error: "Invalid Email" }),
  password: z.string(),
});

export async function login(formData: FormData) {
  const supabase = createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const validateFields = schema.safeParse(data);

  if (!validateFields.success) {
    throw new Error("Validation error");
  }

  const { error } = await supabase.auth.signInWithPassword(data);

  if (!!error) {
    throw new Error(error?.message);
    // redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/internal");
}

export async function signup(formData: FormData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/internal");
}
