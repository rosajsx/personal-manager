import { Metadata } from "next";
import { getUser } from "@/actions/user";
import { getStudents } from "@/actions/students";
import { Card, CardContent } from "@/components/ui/card";
import { AddStudentsModal } from "./AddStudentsModal";
import { StudentsTable } from "./StudentsTable";
import { Students } from "./Students";
import useSupabaseServer from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { QueryClient } from "@tanstack/react-query";
import { prefetchQuery } from "@supabase-cache-helpers/postgrest-react-query";
import { getStudentsByPersonalId } from "@/queries/getStudentsByPersonalId";

export const metadata: Metadata = {
  title: "Estudantes",
};

export default async function StudentsPage() {
  const queryClient = new QueryClient();
  const cookieStore = cookies();
  const supabase = useSupabaseServer(cookieStore);

  const data = await getUser(supabase);

  await prefetchQuery(
    queryClient,
    getStudentsByPersonalId(supabase, data?.user?.id)
  );

  //const { user } = await getUser(supabase);

  return <Students userId={user?.id} students={students} />;
}
