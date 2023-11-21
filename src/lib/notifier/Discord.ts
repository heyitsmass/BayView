import { Notifier } from ".";

type DiscordHeaderType = {
  "Content-Type": "application/json";
  Authorization: string;
};

type DiscordDMChannel = {
  id: string;
  type: number;
  last_message_id: string | null;
  flags: number;
  recipients: DiscordDMRecipient[];
};

type DiscordDMRecipient = {
  id: string;
  username: string;
  avatar: string;
  discriminator: string;
  public_flags: number;
  premium_type: number;
  flags: number;
  banner: string;
  accent_color: number;
  global_name: string;
  avatar_decoration_data: [Object];
  banner_color: string;
};

export class DiscordNotifier implements Notifier {
  /** Discord Notifier implementation */

  private static DISCORD_API = "https://discord.com/api/v10";
  private static HEADERS: DiscordHeaderType = {
    "Content-Type": "application/json",
    Authorization: `Bot ${process.env.DISCORD_API_TOKEN}`
  };
  private channel_id: number | string;
  private recipient_id: number | string;

  public send_notification() {
    /** Sends a notification to the users discord account */
  }

  private constructor(
    recipient_id: number | string,
    channel_id: number | string
  ) {
    this.recipient_id = recipient_id;
    this.channel_id = channel_id;
  }
  public async send_dm(content: string) {
    await fetch(
      `${DiscordNotifier.DISCORD_API}/channels/${this.channel_id}/messages`,
      {
        method: "POST",
        headers: DiscordNotifier.HEADERS,
        body: JSON.stringify({ content })
      }
    );
  }

  public static async send_dm(recipient_id: number | string, content: string) {
    //Create the endpoint
    const endpoint = `${this.DISCORD_API}/users/@me/channels`;

    const channel_id = await fetch(endpoint, {
      method: "POST",
      headers: this.HEADERS,
      body: JSON.stringify({ recipient_id })
    }) // Open the DM channel with recipient
      .then(async (res) => {
        const channel: DiscordDMChannel = await res.json();

        await fetch(`${this.DISCORD_API}/channels/${channel.id}/messages`, {
          method: "POST",
          headers: this.HEADERS,
          body: JSON.stringify({ content })
        }); // Send the message to recipient

        return channel.id;
      })
      .catch((err) => console.log((err as Error).message));
    if (!channel_id) {
      throw new Error("Please try again.");
    }

    return new DiscordNotifier(recipient_id, channel_id);
  }
}
