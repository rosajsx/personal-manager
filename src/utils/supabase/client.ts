import { createBrowserClient } from "@supabase/ssr";
import { SupabaseClient } from "@supabase/supabase-js";
import { useMemo } from "react";

export type TypedSupabaseClient = SupabaseClient;

let client: TypedSupabaseClient | undefined;

export function createClient() {
  if (client) {
    return client;
  }

  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

function useSupabaseBrowser() {
  return useMemo(createClient, []);
}

export default useSupabaseBrowser;
