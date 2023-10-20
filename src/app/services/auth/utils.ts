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

