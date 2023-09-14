import { ReactNode } from "react";
import "./globals.css";
//import BayLoader from "@/utils/BayLoader";

export default async function Layout({
  children
}: {
  children: ReactNode;
}) {
  
  return <>{children}</>;
}
