import { Test, expect, test } from "vitest";
import { EmailNotifier } from "../../lib/notifier/Email";

test.skip("EmailNotifier", async () => {
  const notifier = new EmailNotifier();

  const response = await notifier.send_email(
    "This is a sample Email",
    process.env.SMTP_EMAIL!
  );

  expect(response).toBeDefined();

  console.log(response);
});
