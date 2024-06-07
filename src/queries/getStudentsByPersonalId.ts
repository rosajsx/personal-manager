import { TypedSupabaseClient } from "@/utils/supabase/client";

export function getStudentsByPersonalId(
  client: TypedSupabaseClient,
  personalId: string
) {
  return client
    .from("students")
    .select("*")
    .eq("personal_id", personalId)
    .throwOnError()
    .single();
}
