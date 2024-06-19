import { TypedSupabaseClient } from "@/utils/supabase/client";

export const addStudents = async (
  newStudent: any,
  client: TypedSupabaseClient
) => {
  const response = await client.from("students").insert(newStudent);

  return response.statusText;
};
