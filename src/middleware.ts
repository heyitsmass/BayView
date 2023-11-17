import { NextResponse } from "next/server";

export async function middleware() {
  const res = NextResponse.next();

  res.headers.set("Access-Control-Allow-Origin", "*");
  res.headers.set("Access-Control-Allow-Credentials", "true");
  /*
  res.headers.set(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,PATCH,DELETE"
  ); */

  res.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, anti-csrf, rid, fdi-version, authorization, st-auth-mode"
  );

  return res;
}

export const config = {
  matcher: "/auth/:path*"
};
