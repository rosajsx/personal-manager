import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";

export async function middleware(request: NextRequest) {
  const { response, isAuth } = await updateSession(request);
  const isLoginPage = request.nextUrl.pathname === "/login";

  if (request.nextUrl.pathname === "/error") return response;

  if (!isAuth && !isLoginPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return response;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
