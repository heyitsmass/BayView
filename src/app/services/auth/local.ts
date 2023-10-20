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

