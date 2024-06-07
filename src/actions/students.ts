"use server";

import { createClient } from "@/utils/supabase/server";
import { SupabaseClient } from "@supabase/supabase-js";

export const getStudents = async (
  userId: string,
  client?: SupabaseClient<any, "public", any>
) => {
  const supabase = client ? client : createClient();

  const { data: students } = await supabase
    .from("students")
    .select("*")
    .eq("personal_id", userId);

  return students;
};

export const addStudent = async (
  data: any,
  client?: SupabaseClient<any, "public", any>
) => {
  const supabase = client ? client : createClient();

  const response = await supabase.from("students").insert(data);

  return response.statusText;
};
