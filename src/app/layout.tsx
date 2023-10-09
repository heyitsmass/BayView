import { ReactNode } from "react";
import "./globals.css";

export default async function Layout({
  children
}: {
  children: ReactNode;
}) {

  return <html><body>{children}</body></html>;
}