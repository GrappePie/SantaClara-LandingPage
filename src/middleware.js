import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
  const token = request.cookies.get("token");
  if (token) {
    try {
      const { payload } = await jwtVerify(token.value, new TextEncoder().encode(process.env.JWT_SECRET));
      return NextResponse.next();
    } catch (error) {
      console.log(error);
      return NextResponse.redirect(new URL("/", request.url));
    }
    
  } else {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ['/admin/:path*']
};