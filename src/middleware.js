// middleware utk Autentikasi
// semua hal biasa nya dicek di middleware terlebih dahulu

import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  let token = request.cookies.get("token");
  let url = request.nextUrl.clone();

  if (token) {
    if (url.pathname != "/login" && url.pathname != "/register") {
      return NextResponse.next(); // proses selanjutnya
    } else {
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  } else {
    if (url.pathname != "/login" && url.pathname != "/register") {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    } else {
      return NextResponse.next();
    }
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
