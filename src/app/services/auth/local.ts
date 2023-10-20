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

