"use server";
import { getSSRSession } from "@/utils/session/getSSRSession";
import { redirect } from "next/navigation";
import Session from "supertokens-node/recipe/session";
import supertokens from "supertokens-node";
import ThirdPartyEmailPassword from "supertokens-node/recipe/thirdpartyemailpassword";
import { cookies } from "next/headers";
import { verifySession } from "../utils";

export const logoutOnAllDevices = async () => {
  const session = await verifySession();

  let userId = session.getUserId();

  // Revoke all database sessions for the user
  await Session.revokeAllSessionsForUser(userId);

  // Revoke the current session
  session.revokeSession();

  const cookieStore = cookies();

  /** Delete all cookies on the user's device */
  cookieStore.delete("sAccessToken");
  cookieStore.delete("sFrontToken");
  cookieStore.delete("sRefreshToken");
  cookieStore.delete("st-last-access-token-update");

  redirect("/auth");
};

export const changePassword = async (form: FormData) => {
  const session = await verifySession();

  const oldPassword = form.get("oldPassword")?.valueOf() as string;
  const newPassword = form.get("newPassword")?.valueOf() as string;

  if (oldPassword === newPassword) {
    return "New password cannot be the same as the old password";
  }

  const userInfo = await supertokens.getUser(session.getUserId());

  if (!userInfo) {
    redirect("/auth");
  }

  let loginMethod = userInfo.loginMethods.find(
    (lM) =>
      lM.recipeUserId.getAsString() ===
        session.getRecipeUserId().getAsString() &&
      lM.recipeId === "emailpassword"
  );

  if (loginMethod === undefined) {
    return "Something went wrong. Please try again.";
  }

  const email = loginMethod.email!;

  let isPasswordValid = await ThirdPartyEmailPassword.emailPasswordSignIn(
    session!.getTenantId(),
    email,
    oldPassword
  );

  if (isPasswordValid.status !== "OK") {
    return "Old password is incorrect";
  }

  const response = await ThirdPartyEmailPassword.updateEmailOrPassword({
    recipeUserId: session!.getRecipeUserId(),
    password: newPassword,
    tenantIdForPasswordPolicy: session!.getTenantId()
  });

  if (response.status === "PASSWORD_POLICY_VIOLATED_ERROR") {
    return "Password does not meet requirements";
  }

  return "OK";
};
