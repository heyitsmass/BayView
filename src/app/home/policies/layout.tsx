import { ReactNode } from "react";
import styles from "./layout.module.css";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div
      className={
        styles.layout +
        " border m-20 rounded-2xl bg-zinc-800 border-zinc-700 shadow-2xl p-4"
      }
      style={{
        height: "min-content",
      }}
    >
      {children}
    </div>
  );
}
