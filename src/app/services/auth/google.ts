"use server";
import { OAuth2Client, UserRefreshClient } from "google-auth-library";
import { redirect } from "next/navigation";
import { updateCookies } from "./utils";
import Users from "@/models/User";
import { SCOPES } from "../constants";

const oAuth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "postmessage"
);

export async function getTokens(code: string) {
  const { tokens } = await oAuth2Client.getToken(code);
  return {
    tokens
  };
}

export async function refreshTokens(refreshToken: string) {
  const user = new UserRefreshClient(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    refreshToken
  );

  const { credentials } = await user.refreshAccessToken(); // optain new tokens
  await updateCookies(credentials);

  return {
    credentials
  };
}
const MONGO_DB_ID_LENGTH = 24;

function hashCode(str: string) {
  let hash = 0;
  for (let i = 0, len = str.length; i < len; i++) {
    let chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

const getIdFromGoogle = (googleId: string, email: string) => {
  const _id = parseInt(googleId).toString(16);

  return (
    _id +
    hashCode(email)
      .toString(16)
      .substring(0, MONGO_DB_ID_LENGTH - _id.length)
  ); //new mongoose.Types.ObjectId(_id);
};

export default async function handleLogin(code: string) {
  const { tokens } = await oAuth2Client.getToken(code);

  const _id: string = await fetch(
    `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`
  ).then(async (res) => {
    const userInfo = (await res.json()) as {
      id: string;
      name: string;
      given_name: string;
      family_name: string;
      picture: string;
      locale: string;
      email: string;
      verified_email: boolean;
      hd: string;
    };

    let _id = getIdFromGoogle(userInfo.id, userInfo.email);

    let user = await Users.findOne({ _id });

    tokens.scope = [tokens.scope, SCOPES.USER.default].join(" ");

    if (!user) {
      //create one in the db
      user = new Users({
        _id,
        name: {
          first: userInfo.given_name,
          last: userInfo.family_name
        },
        authType: "google",
        email: userInfo.email,
        credentials: tokens
      });
    } else {
      //update the user in the db
      user.credentials = tokens;
    }

    await user.save();

    return _id;
  });

  await updateCookies(tokens);

  redirect(`/home/${_id}`);
}
