"use server";

import { TypedSupabaseClient } from "@/utils/supabase/client";
import useSupabaseServer from "@/utils/supabase/server";
import { cookies } from "next/headers";

export const getStudentsByPersonalId = async (
  personalId: string,
  client: TypedSupabaseClient
) => {
  const cookieStore = cookies();

  const supabase = client || useSupabaseServer(cookieStore);

  const response = await supabase
    .from("students")
    .select("*")
    .eq("personal_id", personalId)
    .throwOnError();

  return response.data;
};
