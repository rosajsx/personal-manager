import { TypedSupabaseClient } from "@/utils/supabase/client";

export function getUser(client: TypedSupabaseClient) {
  return client.auth.getUser();
}
