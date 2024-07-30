"use server";

import { TypedSupabaseClient } from "@/utils/supabase/client";
import useSupabaseServer from "@/utils/supabase/server";
import { cookies } from "next/headers";

export const getExerciseType = async (client?: TypedSupabaseClient) => {
  const cookieStore = cookies();

  const supabase = client || useSupabaseServer(cookieStore);

  const response = await supabase
    .from("exercise_type")
    .select(
      `
        id,
        name
      `
    )
    .throwOnError();

  return response.data;
};
