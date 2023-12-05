"use server";
import { getSSRSession } from "@/utils/session/getSSRSession";
import { redirect } from "next/navigation";

export const verifySession = async () => {
  const { session, hasToken } = await getSSRSession();
  if (!session) {
    if (!hasToken) {
      redirect("/auth"); // relogin
    }
    redirect("/home"); //try to refresh the session
  }
  return session;
};
