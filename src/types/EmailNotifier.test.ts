import { beforeEach, describe } from 'node:test';
import { EmailNotifier } from './ItineraryManager';
import { expect, test, vi, it } from 'vitest';

test("it should send an email", async () => {
  const notifier = new EmailNotifier();

  const response = await notifier.send_email(
    "This is a sample Email",
    process.env.SMTP_EMAIL!
  );

  expect(response).toBeDefined();

  console.log(response);
});



