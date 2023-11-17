import { Test, expect, test } from "vitest";
import { EmailNotifier } from "../ItineraryManager";

test("EmailNotifier", async () => {
  const notifier = new EmailNotifier();

  const response = await notifier.send_email(
    "This is a sample Email",
    process.env.SMTP_EMAIL!
  );

  expect(response).toBeDefined();

  console.log(response);
});
