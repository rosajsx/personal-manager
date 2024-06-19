"use server";

import useSupabaseServer from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signout() {
  const cookieStore = cookies();
  const supabase = useSupabaseServer(cookieStore);

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    console.log("error", error);
    redirect("/error");
  }

  if (user) {
    await supabase.auth.signOut();
    revalidatePath("/", "layout");
    redirect("/login");
  }
}
