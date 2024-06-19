"use server";

import { TypedSupabaseClient } from "@/utils/supabase/client";
import useSupabaseServer from "@/utils/supabase/server";
import { cookies } from "next/headers";

export const getExercises = async (client?: TypedSupabaseClient) => {
  const cookieStore = cookies();

  const supabase = client || useSupabaseServer(cookieStore);

  const response = await supabase
    .from("exercises")
    .select(
      `
        id,
        name,
        video_url,
        exercise_type (
          name
        ),
        exercise_category (
          id,
          name
        )
        
      `
    )
    .throwOnError();

  return response.data;
};
