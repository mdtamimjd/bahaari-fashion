import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const pathname = req.nextUrl.pathname;

  const publicRoutes = ["/"];

  const isPublicRoute =
    publicRoutes.includes(pathname);

  // protect all routes
  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(
      new URL("/", req.nextUrl)
    );
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};