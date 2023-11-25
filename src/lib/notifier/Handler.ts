"use server";

import { Notifiers } from ".";
import { EmailNotifier } from "./Email";

const cache = new Map<string, EmailNotifier>();

type NotifierCallProps = {
  _id: string;
  delay?: number;
  type: Notifiers;
  mode: "create" | "cancel";
};

export const handleNotifierCall = async ({
  _id,
  delay,
  type,
  mode, // "create" | "cancel"
}: NotifierCallProps) => {
  switch (type) {
    case "email":
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
    case "slack":
    case "twitter":
    case "sms":
    case "discord":
    case "facebook":
      console.log("Not implemented yet");
      break;
  }
};
