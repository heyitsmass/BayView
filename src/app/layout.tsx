"use server";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { ReactNode } from "react";
import { barlow } from "./fonts";
import "./globals.css";

import { SuperTokensProvider } from "@/components/SuperTokens/SuperTokensProvider";
export default async function Layout({
  children,
}: {
  children?: ReactNode;
}) {
  return (
    <html className={barlow.variable}>
      <body>
        <SuperTokensProvider>{children}</SuperTokensProvider>
      </body>
    </html>
  );
}
