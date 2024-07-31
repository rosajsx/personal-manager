"use server";

import { cookies } from "next/headers";

import useSupabaseServer from "@/utils/supabase/server";
import { TypedSupabaseClient } from "@/utils/supabase/client";

interface Data {
  exercise_category_id: string;
  exercise_id: string;
}

export const addCategories = async (
  data: Data | Data[],
  client?: TypedSupabaseClient
) => {
  const cookieStore = cookies();
  const supabase = client || useSupabaseServer(cookieStore);

  const response = await supabase
    .from("exercise_categories")
    .insert(data)
    .throwOnError();

  return response.statusText;
};
