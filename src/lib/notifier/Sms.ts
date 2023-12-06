import { CourierClient } from "@trycourier/courier";

import { Notifier } from ".";
import { NotifierPayload } from "./Handler";

export class SMSNotifier implements Notifier {
  /** SMS Notifier implementation */
  private static courier = new CourierClient({
    authorizationToken: process.env.COURIER_AUTH_TOKEN
  });

  public async sendSMS(userMessage: string, userNum: string) {
    /** Sends an SMS to the users phone */

    const { requestId } = await SMSNotifier.courier.send({
      message: {
        to: {
          phone_number: userNum
        },
        content: {
          title: "Adventure Haven",
          body: userMessage
        }
      }
    });

    return requestId;
  }

  public send_notification({ ...props }: NotifierPayload) {
    /** Sends a notification to the users phone */
  }

  public notify = async () => {};
}
