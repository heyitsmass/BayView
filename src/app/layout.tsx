"use server";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { ReactNode } from "react";
import "./globals.css";
import { barlow } from "./fonts";

import OAuthProvider from "./GoogleProvider";

export default async function Layout({ children }: { children: ReactNode }) {
	return (
		<html className={barlow.variable}>
			<body>
				<OAuthProvider clientId={process.env.GOOGLE_CLIENT_ID!}>
          {children}
        </OAuthProvider>
			</body>
		</html>
	);
}
