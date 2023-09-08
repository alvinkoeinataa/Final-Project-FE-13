import { NextResponse } from "next/server";

export function middleware(request) {
  let token = request.cookies.get("token");
  let url = request.nextUrl.clone();

  if (token) {
    if (url.pathname != "/login" && url.pathname != "/register") {
      return NextResponse.next();
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
