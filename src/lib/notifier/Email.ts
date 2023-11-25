import { createTransport } from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import { Notifier } from ".";

export class EmailNotifier implements Notifier {
  /** Email Notifier implementation */
  private id: NodeJS.Timer | null = null;

  private setId(id: NodeJS.Timer) {
    this.id = id;
  }
  private transporter = createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
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
          path: "/images/baymax.png",
        },
      ],
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

  public async cancel() {
    "use server";
    /** Cancels the notification */
    console.log("Cancelling...");
    return this.id ? clearTimeout(this.id) : null;
  }

  public async notify(delay: number) {
    "use server";
    /** Sends a notification to the users email */
    return this.setId(
      setTimeout(() => {
        console.log("Notified!");
      }, delay * 1000)
    );
  }
}
