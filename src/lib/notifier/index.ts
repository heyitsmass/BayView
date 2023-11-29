import { FacebookNotifier } from "./Facebook";
import { SlackNotifier } from "./Slack";
import { TwitterNotifier } from "./Twitter";
import { EmailNotifier } from "./Email";
import { SMSNotifier } from "./Sms";
import { DiscordNotifier } from "./Discord";
import { NotifierPayload } from "./Handler";

/** Notifier interface for the Notifiers */
export interface Notifier {
  /** Sends a notification to the user */
  send_notification({ ...props }: NotifierPayload): void;
  /** Delay in seconds */
  notify(delay: number): void;
}

const notifier = {
  facebook: FacebookNotifier,
  slack: SlackNotifier,
  twitter: TwitterNotifier,
  email: EmailNotifier,
  sms: SMSNotifier,
  discord: DiscordNotifier,
};

export type Notifiers = keyof typeof notifier;

export default notifier;
