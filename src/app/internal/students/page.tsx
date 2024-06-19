import { Metadata } from "next";
import { getUser } from "@/actions/user";

import { Students } from "./Students";
import useSupabaseServer from "@/utils/supabase/server";
import { cookies } from "next/headers";

import { getStudentsByPersonalId } from "@/actions/students/getStudentsByPersonalId";

export const metadata: Metadata = {
  title: "Estudantes",
};

export default async function StudentsPage() {
  const cookieStore = cookies();
  const supabase = useSupabaseServer(cookieStore);

  const { user } = await getUser(supabase);

  const initialStudents = await getStudentsByPersonalId(user!.id!, supabase);

  return <Students userId={user?.id} data={initialStudents!} />;
}
