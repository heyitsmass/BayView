import baymax from "@/public/images/baymax.png";
import { createTransport } from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import { Notifier } from ".";

export class EmailNotifier implements Notifier {
  /** Email Notifier implementation */

  private transporter = createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD
    }
  });

  public create_email(message: string, to: string) {
    return {
      from: process.env.SMTP_EMAIL,
      to,
      subject: "Sample Email",
      text: message,
      html: "<b>Hello SMTP Email</b>",
      attachments: [
        {
          filename: "baymax.png",
          path: baymax.src
        }
      ]
    } as Mail.Options;
  }

  public async send_email(message: string, to: string) {
    return this.transporter
      .sendMail(this.create_email(message, to))
      .then((res) => {
        return res;
      });
  }

  public send_notification() {
    /** Sends a notification to the users email */
  }
}
