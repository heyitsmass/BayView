import { Notifier } from ".";
import { NotifierPayload } from "./Handler";

export class TwitterNotifier implements Notifier {
  /** Twitter Notifier implementation */
  public send_notification({ ...props }: NotifierPayload) {
    /** Sends a notification to the users twitter account */
  }

  public notify = async () => {};
}
