"use server";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { ReactNode } from "react";

import { Credentials } from "google-auth-library";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Provider from "../Provider";

import Users from "@/models/User";
import { HydratedSingleSubdocument } from "mongoose";
import TopBar from "@/components/HomePage/TopBar";

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
export default async function Layout({
  children
}: {
  children: ReactNode;
}) {
  let credentials;

  try {
    credentials = await validateUser();
  } catch (err) {
    console.log((err as Error).message);
    redirect("/auth/logout");
  }

  return (
    <Provider
      value={{
        credentials
      }}
    >
      <div className="flex-start w-screen h-screen">
        <TopBar/>
        <div style={{ height: 'calc(100vh - 5rem)' }} className="my-20 overflow-y-scroll">
          {children}
        </div>
      </div>
    </Provider>
  );
}
