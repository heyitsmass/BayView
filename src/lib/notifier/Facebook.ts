import { Notifier } from ".";
import { NotifierPayload } from "./Handler";

export class FacebookNotifier implements Notifier {
  /** Facebook Notifier implementation */
  public send_notification({ ...props }: NotifierPayload) {
    /** Sends a notification to the users facebook account */
  }
  public notify = async () => {};
}
