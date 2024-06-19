import { Metadata } from "next";
import { getUser } from "@/actions/user";

import { Students } from "./Students";
import useSupabaseServer from "@/utils/supabase/server";
import { cookies } from "next/headers";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  useQuery,
} from "@tanstack/react-query";
import { prefetchQuery } from "@supabase-cache-helpers/postgrest-react-query";
import { getStudentsByPersonalId } from "@/services/queries/getStudentsByPersonalId";

export const metadata: Metadata = {
  title: "Estudantes",
};

export default async function StudentsPage() {
  const queryClient = new QueryClient();
  const cookieStore = cookies();
  const supabase = useSupabaseServer(cookieStore);

  const { user } = await getUser(supabase);

  await queryClient.prefetchQuery({
    queryKey: ["students"],
    queryFn: () => getStudentsByPersonalId(supabase, user!.id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Students userId={user?.id} />
    </HydrationBoundary>
  );
}
