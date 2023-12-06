'use server';
import { NextRequest, NextResponse } from "next/server";
import {
  SessionContainer,
  VerifySessionOptions,
} from "supertokens-node/recipe/session";
import { serialize } from "cookie";
import { getSSRSession } from "./getSSRSession";

export async function withSession(
  request: NextRequest,
  handler: (session: SessionContainer | undefined) => Promise<NextResponse>,
  options?: VerifySessionOptions
) {
  let { session, nextResponse, baseResponse } = await getSSRSession(
    request,
    options
  );
  if (nextResponse) {
    return nextResponse;
  }

  let userResponse = await handler(session);

  let didAddCookies = false;
  let didAddHeaders = false;

  /**
   * Base response is the response from SuperTokens that contains all the session tokens.
   * We add all cookies and headers in the base response to the final response from the
   * API to make sure sessions work correctly.
   */
  for (const respCookie of baseResponse.cookies) {
    didAddCookies = true;
    userResponse.headers.append(
      "Set-Cookie",
      serialize(respCookie.key, respCookie.value, {
        domain: respCookie.domain,
        expires: new Date(respCookie.expires),
        httpOnly: respCookie.httpOnly,
        path: respCookie.path,
        sameSite: respCookie.sameSite,
        secure: respCookie.secure,
      })
    );
  }

  baseResponse.headers.forEach((value, key) => {
    didAddHeaders = true;
    userResponse.headers.set(key, value);
  });

  /**
   * For some deployment services (Vercel for example) production builds can return cached results for
   * APIs with older header values. In this case if the session tokens have changed (because of refreshing
   * for example) the cached result would still contain the older tokens and sessions would stop working.
   *
   * As a result, if we add cookies or headers from base response we also set the Cache-Control header
   * to make sure that the final result is not a cached version.
   */
  if (didAddCookies || didAddHeaders) {
    if (!userResponse.headers.has("Cache-Control")) {
      // This is needed for production deployments with Vercel
      userResponse.headers.set(
        "Cache-Control",
        "no-cache, no-store, max-age=0, must-revalidate"
      );
    }
  }

  return userResponse;
}
