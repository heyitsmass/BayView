"use server";

import { EmailNotifier } from "./Email";

const cache = new Map<string, EmailNotifier>();

export const HandleCall = async ({
  _id,
  delay,
  type,
  mode, // "create" | "cancel"
}: {
  _id: string;
  delay?: number;
  type: "Facebook" | "Email";
  mode: "create" | "cancel";
}) => {
  switch (type) {
    case "Email":
      if (mode === "create") {
        console.log(`Set the timer for ${delay} seconds`);
        const notifier = new EmailNotifier();
        notifier.notify(delay!);
        cache[_id] = notifier;
      } else {
        const notifier = cache[_id];
        if (notifier) {
          await notifier.cancel();
          delete cache[_id];
          console.log("Timer cancelled!");
        }
      }
      break;
    case "Facebook":
      break;
  }
};
