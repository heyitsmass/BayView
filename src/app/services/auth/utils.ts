"use server";

import { Credentials } from "google-auth-library";
import mongoose from "mongoose";
import { cookies } from "next/headers";

import { SCOPES } from "../constants";
import jwt from "jsonwebtoken";

export async function updateCookies({ ...args }: Credentials) {
  const cookieStore = cookies();

  const { access_token, refresh_token, expiry_date } = args;

  if (!access_token || !refresh_token || !expiry_date)
    throw Error("Access token not found");

  cookieStore.set("access_token", access_token, { expires: expiry_date });
  cookieStore.set("refresh_token", refresh_token, { expires: expiry_date });
}

export const createToken = (payload: any, expiresIn: number | string) =>
  jwt.sign(payload, process.env.TOKEN_KEY!, { expiresIn });

export const getCredentials = (username: string, _id?: string) => {
  if (!_id) {
    const user_id = new mongoose.Types.ObjectId();
    _id = user_id.toString();
  }

  const maxAge = 2 * 60 * 1000; //in milliseconds
  //console.log("Access Token: ", { _id });

  const access_token = createToken({ _id }, `${maxAge}`);
  const refresh_token = createToken(
    {
      username,
      access_token
    },
    maxAge
  );
  //console.log("Access Token: ", { username, access_token });
  const id_token = createToken(
    {
      _id,
      username,
      access_token,
      refresh_token
    },
    maxAge
  );
  //console.log("Id Token: ", { username, access_token });

  return {
    _id,
    credentials: {
      access_token,
      refresh_token,
      expiry_date: Date.now() + maxAge,
      id_token,
      scope: SCOPES.USER.default.join(" ")
    } as Credentials
  };
};
