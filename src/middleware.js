import { jwtDecode } from "jwt-decode";
import { NextResponse } from "next/server";

export function middleware(request) {
  const isPublicPath =
    request.nextUrl.pathname == "/login" ||
    request.nextUrl.pathname == "/signup";
  const token = request.cookies.get("token")?.value || "";
  let decodedToken = "";
  if (token == "") {
    decodedToken = "";
  } else {
    decodedToken = jwtDecode(token);
  }
  if (isPublicPath && token) {
    return NextResponse.redirect(
      `${request.nextUrl.origin}/profile/${decodedToken.username}`
    );
  }
  if (!isPublicPath && !token) {
    return NextResponse.redirect(`${request.nextUrl.origin}/login`);
  }
}

export const config = {
  matcher: ["/login", "/signup", "/profile", "/profile/:path*"],
};
