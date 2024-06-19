"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import useSupabaseServer from "@/utils/supabase/server";
import { cookies } from "next/headers";

import { z } from "zod";
import { isRedirectError } from "next/dist/client/components/redirect";

const schema = z.object({
  email: z.string({ invalid_type_error: "Invalid Email" }),
  password: z.string(),
});

export async function login(formData: FormData) {
  try {
    const cookieStore = cookies();
    const supabase = useSupabaseServer(cookieStore);

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
  } catch (error) {
    if (isRedirectError(error)) {
      console.log("redirect error", error);
      throw error;
    }

    throw new Error("Erro comum");
  }
}

export async function signup(formData: FormData) {
  const cookieStore = cookies();
  const supabase = useSupabaseServer(cookieStore);
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
