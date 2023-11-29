import { NextResponse } from "next/server";

export async function middleware() {
  const res = NextResponse.next();

  const origin =
    process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
      ? process.env.NEXT_PUBLIC_VERCEL_ENV!
      : "*";
  res.headers.set("Access-Control-Allow-Origin", origin);
  res.headers.set("Access-Control-Allow-Credentials", "true");

  res.headers.set(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,PATCH,DELETE"
  );
  res.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, anti-csrf, rid, fdi-version, authorization, st-auth-mode"
  );

  return res;
}

export const config = {
  matcher: "/(api/)?auth/:path*"
};
export default middleware;
