import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { User } from "./types/user";

export function middleware(request: NextRequest) {
  const cookies = request.cookies.get("user");
  const user: User | undefined = JSON.parse(cookies?.value || "{}");
  if (user && request.nextUrl.pathname.startsWith("/admin") && user.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.rewrite(request.url);
}
