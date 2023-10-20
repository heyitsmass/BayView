"use client";

import { useRouter } from "next/navigation";

export default function Page({
  params
}: {
  params: {
    id: string;
  };
}) {
  const { push } = useRouter();

  const { id } = params;

  return (
    <div>
      {id}
      <button onClick={async (e) => push("/auth/logout")}>Logout</button>
    </div>
  );
}
