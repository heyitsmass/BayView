"use server";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { ReactNode } from "react";
import "./globals.css";
import { barlow, barlowCondensed, barlowSemiCondensed } from "./fonts";
import { SuperTokensProvider } from "@/components/SuperTokens/SuperTokensProvider";
import { PopupProvider } from "./PopupProvider";

export default async function Layout({
  children,
}: {
  children?: ReactNode;
}) {
  return (
    <html
      className={`${barlow.variable} ${barlowCondensed.variable}  ${barlowSemiCondensed.variable}`}
    >
      <body>
        <PopupProvider>
          <SuperTokensProvider>{children}</SuperTokensProvider>
        </PopupProvider>
      </body>
    </html>
  );
}
