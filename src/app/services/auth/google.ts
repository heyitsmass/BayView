"use server";
import { OAuth2Client, UserRefreshClient } from "google-auth-library";
import { redirect } from "next/navigation";
import { updateCookies } from "./utils";
import Users from "@/models/User";
import { SCOPES } from "../constants";

const oAuth2Client = new OAuth2Client(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  "postmessage"
);
export async function refreshTokens(refreshToken: string) {
  const user = new UserRefreshClient(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    refreshToken
  );

  const { credentials } = await user.refreshAccessToken(); // optain new tokens
  await updateCookies(credentials);

  return {
    credentials
  };
}
export default async function handleLogin(code: string) {
  const { tokens } = await oAuth2Client.getToken(code);
  await updateCookies(tokens);

  redirect(`/home/${_id}`);
}
