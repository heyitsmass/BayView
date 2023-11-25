import { CourierClient } from "@trycourier/courier";

import { Notifier } from ".";
import { NotifierPayload } from "./Handler";

export class SMSNotifier implements Notifier {
  /** SMS Notifier implementation */

  public async sendSMS(userMessage: string, userNum: string) {
    /** Sends an SMS to the users phone */
    const courier = CourierClient({
      authorizationToken: process.env.COURIER_AUTH_TOKEN,
    });
    const { requestId } = await courier.send({
      message: {
        to: {
          phone_number: userNum,
        },
        content: {
          body: userMessage,
        },
      },
    });

    return requestId;
  }

  public send_notification({ ...props }: NotifierPayload) {
    /** Sends a notification to the users phone */
  }

  public notify = async () => {};
}
