import { ensureSuperTokensInit } from "@/config/backend";
import { NextRequest, NextResponse } from "next/server";
import Session, {
  SessionContainer,
  VerifySessionOptions,
} from "supertokens-node/recipe/session";
import {
  PreParsedRequest,
  CollectingResponse,
} from "supertokens-node/framework/custom";
import { cookies, headers } from "next/headers";
import { HTTPMethod } from "supertokens-node/types";

ensureSuperTokensInit();

export async function getSSRSession(
  req?: NextRequest,
  options?: VerifySessionOptions
): Promise<{
  session: SessionContainer | undefined;
  hasToken: boolean;
  hasInvalidClaims: boolean;
  baseResponse: CollectingResponse;
  nextResponse?: NextResponse;
}> {
  const query =
    req !== undefined
      ? Object.fromEntries(new URL(req.url).searchParams.entries())
      : {};
  const parsedCookies: Record<string, string> = Object.fromEntries(
    (req !== undefined ? req.cookies : cookies())
      .getAll()
      .map((cookie) => [cookie.name, cookie.value])
  );

  /**
   * Pre parsed request is a wrapper exposed by SuperTokens. It is used as a helper to detect if the
   * original request contains session tokens. We then use this pre parsed request to call `getSession`
   * to check if there is a valid session.
   */
  let baseRequest = new PreParsedRequest({
    method: req !== undefined ? (req.method as HTTPMethod) : "get",
    url: req !== undefined ? req.url : "",
    query: query,
    headers: req !== undefined ? req.headers : headers(),
    cookies: parsedCookies,
    getFormBody: () => req!.formData(),
    getJSONBody: () => req!.json(),
  });

  /**
   * Collecting response is a wrapper exposed by SuperTokens. In this case we are using an empty
   * CollectingResponse when calling `getSession`. If the request contains valid session tokens
   * the SuperTokens SDK will attach all the relevant tokens to the collecting response object which
   * we can then use to return those session tokens in the final result (refer to `withSession` in this file)
   */
  let baseResponse = new CollectingResponse();

  try {
    /**
     * `getSession` will throw if session is required and there is no valid session. You can use
     * `options` to configure whether or not you want to require sessions when calling `getSSRSession`
     */
    let session = await Session.getSession(
      baseRequest,
      baseResponse,
      options
    );
    return {
      session,
      hasInvalidClaims: false,
      hasToken: session !== undefined,
      baseResponse,
    };
  } catch (err) {
    if (Session.Error.isErrorFromSuperTokens(err)) {
      return {
        hasToken: err.type !== Session.Error.UNAUTHORISED,
        /**
         * This allows us to protect our routes based on the current session claims. For example
         * this will be true if email verification is required but the user has not verified their
         * email.
         */
        hasInvalidClaims: err.type === Session.Error.INVALID_CLAIMS,
        session: undefined,
        baseResponse,
        nextResponse: new NextResponse("Authentication required", {
          status: err.type === Session.Error.INVALID_CLAIMS ? 403 : 401,
        }),
      };
    } else {
      throw err;
    }
  }
}
