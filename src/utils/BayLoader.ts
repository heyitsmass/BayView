import { Client, GatewayIntentBits, REST, Routes } from "discord.js";

type BayViewClient<Ready extends boolean = boolean> = Client<Ready>;

export class BayView {
  private static client: BayViewClient = new Client({
    intents: [GatewayIntentBits.Guilds]
  });
  private readonly $parent: typeof BayView = BayView;
  private static instance?: BayView;
  private static readonly token?: string = process.env.DISCORD_API_TOKEN;
  private static readonly clientID?: string = process.env.DISCORD_CLIENT_ID;
  private rest: REST = new REST({
    version: "10"
  }).setToken(BayView.token!);

  public readonly client = BayView.client;
  private commands = [
    {
      name: "ping",
      description: "Replies with Pong"!
    }
  ];
  private constructor() {
    this.client.on("ready", () => {
      console.log(`Logged in as ${this.client.user?.tag}!`);
    });

    this.client.on("interactionCreate", async (interaction) => {
      if (!interaction.isChatInputCommand()) return;

      if (interaction.commandName === "ping") {
        await interaction.reply("Bah-a-la-la-la.");
      }
    });
  }

  public login = async () => {
    const { token, clientID } = this.$parent;

    if (!this.client.readyAt) {
      await this.rest.put(Routes.applicationCommands(clientID!), {
        body: [...this.commands]
      });

      console.log("Successfully reloaded application (/) commands.");

      await this.client.login(token);
    }
    return this as BayView;
  };

  static init = () => {
    if (!this.token) {
      throw new Error("API token required.");
    }
    return (this.instance ??= new BayView());
  };
}

try {
  BayView.init().login();
} catch (err) {
  console.log(err);
}
