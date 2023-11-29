import { Notifier } from ".";
import { NotifierPayload } from "./Handler";

export class SlackNotifier implements Notifier {
  /** Slack Notifier implementation */
  public send_notification({ ...props }: NotifierPayload) {
    /** Sends a notification to the users slack account */
  }
  public notify = async () => {};
}
