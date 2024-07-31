"use server";

import { TypedSupabaseClient } from "@/utils/supabase/client";
import useSupabaseServer from "@/utils/supabase/server";
import { cookies } from "next/headers";

export const deleteStudentById = async (
  studentId: string,
  client?: TypedSupabaseClient
) => {
  const cookieStore = cookies();

  const supabase = client || useSupabaseServer(cookieStore);

  const response = await supabase
    .from("students")
    .delete()
    .eq("id", studentId)
    .throwOnError();

  return response.statusText;
};
