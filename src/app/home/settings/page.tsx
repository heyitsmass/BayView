"use client";
import { useHomepage } from "@/context";

export default function Page() {
  const ctx = useHomepage();

  const { user } = ctx!;
  return <></>;
}
