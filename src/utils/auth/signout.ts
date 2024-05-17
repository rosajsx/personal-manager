"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function signout() {
  const supabase = createClient();

  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      redirect("/error");
    }

    if (user) {
      await supabase.auth.signOut();
      revalidatePath("/", "layout");
      redirect("/login");
    }
  } catch (error) {
    redirect("/error");
  }
}
