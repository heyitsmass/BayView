"use server";
import Users from "@/models/User";
import { EmailUser } from "@/types/User";

import bcrypt from "bcryptjs";
import { Credentials } from "google-auth-library";
import jwt from "jsonwebtoken";
import { HydratedSingleSubdocument } from "mongoose";
import { redirect } from "next/navigation";
import { getCredentials, updateCookies } from "./utils";

const securePassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);

  return bcrypt.hash(password, salt);
};

export const registerUser = async (form: FormData) => {
  const username = form.get("username") as string;
  let user = await Users.findOne({
    username
  });

  if (user) throw Error("Username already taken. Please login");

  const email = form.get("email") as string;

  const phone = form.get("phone") as string;
  const name = {
    first: form.get("first-name") as string,
    last: form.get("last-name") as string
  };

  const password = await securePassword(form.get("password") as string);

  const { _id, credentials } = getCredentials(username);

  user = await Users.create({
    authType: "email",
    _id,
    username,
    email,
    phone,
    name,
    password,
    credentials
  });
};

export async function refreshTokens(refreshToken: string) {
  const payload = jwt.verify(refreshToken, process.env.TOKEN_KEY!) as {
    username: string;
    access_token: string;
  };

  const { _id } = jwt.verify(
    payload.access_token,
    process.env.TOKEN_KEY!
  ) as {
    _id: string;
  };

  const user = await Users.findOne({
    _id,
    username: payload.username,
    "credentials.refresh_token": refreshToken
  });

  if (!user) throw Error("User not found");

  const { credentials } = await user.refreshAccessToken();

  await updateCookies(credentials);

  return {
    credentials: user.credentials
  };
}

export async function loginUser(form: FormData) {
  const emailOrUsername = form.get("emailOrUsername") as string;
  const password = form.get("password") as string;

  const user = await Users.findOne({
    $or: [{ email: emailOrUsername }, { username: emailOrUsername }]
  });

  if (!user) throw Error("User not found");

  const validPassword = await bcrypt.compare(
    password,
    (user as EmailUser).password
  );

  if (!validPassword) throw Error("Invalid password");

  await user.refreshAccessToken();

  const creds = (
    user.credentials as HydratedSingleSubdocument<Credentials>
  ).toJSON() as Credentials;

  await updateCookies(creds);

  redirect(`/home/${user._id.toString()}`);
}
