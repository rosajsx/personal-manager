"use server";

import { z } from "zod";
import { cookies } from "next/headers";

import useSupabaseServer from "@/utils/supabase/server";
import { TypedSupabaseClient } from "@/utils/supabase/client";

interface Data {
  name: string;
  type: string;
  video_url?: string;
  categories?: string[];
}

export const addExercise = async (data: Data, client?: TypedSupabaseClient) => {
  const cookieStore = cookies();
  const supabase = client || useSupabaseServer(cookieStore);

  const response = await supabase
    .from("exercises")
    .insert({
      name: data.name,
      type_id: data.type,
      video_url: data.video_url || null,
    })
    .throwOnError()
    .select();

  const itemId = response.data?.[0];

  const categoriesData = data?.categories?.map((item) => ({
    exercise_category_id: item,
    exercise_id: itemId?.id,
  }));

  await supabase
    .from("exercise_categories")
    .insert(categoriesData)
    .throwOnError();

  return response.statusText;
};
