import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient();

export async function GET(request: NextRequest) {
  const headersList = headers();
  const referer = headersList.get("personal_id");

  console.log("referer", referer);

  return NextResponse.json({ message: "" }, { status: 200 });
}
