"use server";
import { createClient } from "@/utils/supabase/server";
import { SupabaseClient } from "@supabase/supabase-js";

export const getUser = async (client?: SupabaseClient<any, "public", any>) => {
  const supabase = client ? client : createClient();
  const response = await supabase.auth.getUser();

  return response.data;
};
