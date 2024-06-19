import { TypedSupabaseClient } from "@/utils/supabase/client";

export async function getStudentsByPersonalId(
  client: TypedSupabaseClient,
  personalId: string
) {
  const response = await client
    .from("students")
    .select("*")
    .eq("personal_id", personalId)
    .throwOnError();

  return response.data;
}
