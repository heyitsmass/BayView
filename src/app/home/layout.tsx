"use server";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { ReactNode } from "react";

import { Credentials } from "google-auth-library";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Provider from "../Provider";

import Users from "@/models/User";
import { HydratedSingleSubdocument } from "mongoose";

async function validateUser() {
  const ref_tok = cookies().get("refresh_token")?.value;
  if (!ref_tok) redirect("/auth/login");

  const user = await Users.findOne({
    "credentials.refresh_token": ref_tok
  });

  if (!user) throw Error("User not found");

  if (user.credentials.expiry_date! <= Date.now()) {
    throw new Error("Token expired");
  }

  return (
    user.credentials as HydratedSingleSubdocument<Credentials>
  ).toJSON();
}
}
