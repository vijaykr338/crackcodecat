import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from 'jose';

export default async function middleware(req: NextRequest) {
  const protectedPaths = ["/api/manager", "/manager"];
  const { pathname } = req.nextUrl;

  // Middleware must be async to use jwtVerify
  if (protectedPaths.some((p) => pathname.startsWith(p))) {
    const token = req.cookies.get("user")?.value;
    //console.log("token is ", token);

    if (!token) {
      return NextResponse.redirect(new URL("/auth/signin", req.url));
    }

    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
      const { payload } = await jwtVerify(token, secret);
      
      // The payload will have the user data, including the role
      if (payload.role !== "ADMIN") {
        console.log("verified but not admin");
        return NextResponse.redirect(new URL("/auth/signin", req.url));
      }
    } catch(e) {
      console.log("error aaya", e);
      return NextResponse.redirect(new URL("/auth/signin", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/api/manager/:path*",
    "/manager/:path*"
  ],
};