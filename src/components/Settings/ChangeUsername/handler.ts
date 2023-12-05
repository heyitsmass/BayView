import { redirect } from "next/navigation";
import supertokens from "supertokens-node";
import ThirdPartyEmailPassword from "supertokens-node/recipe/thirdpartyemailpassword";
import UserMetadata from "supertokens-node/recipe/usermetadata";
import { verifySession } from "../utils";
import { isEmailChangeAllowed } from "supertokens-node/recipe/accountlinking";

import { UserMetadata as TUserMetaata } from "@/types/User";
export const changeUsername = async (form: FormData) => {
  const session = await verifySession();

  const newUsername = form.get("newUsername")?.valueOf() as string;

  const { metadata } = (await UserMetadata.getUserMetadata(
    session.getUserId()
  )) as {
    status: "OK";
    metadata: TUserMetaata;
  };

  if (!metadata) {
    redirect("/auth");
  }

  const oldUsername = metadata.username;

  if (oldUsername === newUsername) {
    return "New username cannot be the same as the old username";
  }

  const res = await UserMetadata.updateUserMetadata(
    session.getUserId(),
    {
      username: newUsername
    },
    true
  );

  return "OK";
};

export const changeEmail = async (form: FormData) => {
  const session = await verifySession();

  const newEmail = form.get("newEmail")?.valueOf() as string;

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

  if (loginMethod?.recipeId === "thirdparty") {
    return "You are logged in with a third party provider. Please log in with your third party provider to change your email.";
  }

  if (
    !(await isEmailChangeAllowed(
      session.getRecipeUserId(),
      newEmail,
      false
    ))
  ) {
    return "Email change not allowed";
  }

  if (!loginMethod?.email) {
    return "Something went wrong. Please try again.";
  }

  const oldEmail = loginMethod.email;

  let isPasswordValid = await ThirdPartyEmailPassword.emailPasswordSignIn(
    session!.getTenantId(),
    oldEmail,
    form.get("password")?.valueOf() as string
  );

  if (!isPasswordValid) {
    return "Wrong password";
  }

  const res = await ThirdPartyEmailPassword.updateEmailOrPassword({
    recipeUserId: session.getRecipeUserId(),
    email: newEmail
  });

  return "OK";
};
