"use server";
import useSupabaseServer from "@/utils/supabase/server";
import { SupabaseClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

export const getUser = async (client?: SupabaseClient<any, "public", any>) => {
  const cookieStore = cookies();

  const supabase = client ? client : useSupabaseServer(cookieStore);
  const response = await supabase.auth.getUser();

  return response.data;
};
