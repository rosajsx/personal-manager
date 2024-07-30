"use server";

import { TypedSupabaseClient } from "@/utils/supabase/client";
import useSupabaseServer from "@/utils/supabase/server";
import { cookies } from "next/headers";

export const getExerciseCategories = async (client?: TypedSupabaseClient) => {
  const cookieStore = cookies();

  const supabase = client || useSupabaseServer(cookieStore);

  const response = await supabase
    .from("exercise_category")
    .select(
      `
        id,
        name
      `
    )
    .throwOnError();

  return response.data;
};
