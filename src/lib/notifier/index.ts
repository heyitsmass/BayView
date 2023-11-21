import { FacebookNotifier } from "./Facebook";
import { SlackNotifier } from "./Slack";
import { TwitterNotifier } from "./Twitter";
import { EmailNotifier } from "./Email";
import { SMSNotifier } from "./Sms";
import { DiscordNotifier } from "./Discord";

/** Notifier interface for the Notifiers */
export interface Notifier {
  /** Sends a notification to the user */
  send_notification(): void;
}

const notifier = {
  facebook: FacebookNotifier,
  slack: SlackNotifier,
  twitter: TwitterNotifier,
  email: EmailNotifier,
  sms: SMSNotifier,
  discord: DiscordNotifier
};

export default notifier;
