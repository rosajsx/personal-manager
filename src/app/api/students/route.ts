import useSupabaseServer from "@/utils/supabase/server";
import { cookies, headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const cookieStore = cookies();
const supabase = useSupabaseServer(cookieStore);

export async function GET(request: NextRequest) {
  const headersList = headers();
  const id = headersList.get("personal_id");

  if (!id) {
    return NextResponse.json({ message: "Id not found" }, { status: 400 });
  }

  const { data } = await supabase
    .from("students")
    .select("*")
    .eq("personal_id", id);

  return NextResponse.json({ data }, { status: 200 });
}
