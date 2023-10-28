"use client";

import { useRouter } from "next/navigation";
import styles from "./page.module.css";

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
	<div className={styles.layout}>
		<div>
			{id}
			<button onClick={async (e) => push("/auth/logout")}>Logout</button>
		</div>
		{/* <TopBar></TopBar> */}
		<div className={styles.contentGrid}>
			{/* Card Components here */}
		</div>
	</div>
  );
}
