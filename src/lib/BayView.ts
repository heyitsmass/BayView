import {
  CacheType,
  Client,
  GatewayIntentBits,
  Interaction,
  REST,
  Routes
} from "discord.js";

type BayInitResponse<T> = {
  ok?: true;
  data: T;
};

export enum BayResponses {
  OK = "Bah-a-la-la-la.",
  WARNING = "I have some concerns.",
  ERROR = "It is alright to cry.",
  DELAY = "I am not fast."
}

class BayView {
  private client: Client<boolean> = new Client({
    intents: [GatewayIntentBits.Guilds]
  });
  private static instance?: BayView;
  private static rest: REST = new REST({ version: "10" }).setToken(
    process.env.DISCORD_API_TOKEN!
  );
  private static commands: {
    name: string;
    description: string;
  }[] = [
    {
      name: "ping",
      description: "Replies with Pong!"
    }
  ];

  static isReady: boolean = !!this.instance;

  private constructor() {
    this.client.on("ready", this.onReady);
    this.client.on("interactionCreate", this.onInteractionCreate);
  }

  private onReady = () => {
    console.log(`Logged in as ${this.client.user!.tag}!`);
  };

  private onInteractionCreate = async (
    interaction: Interaction<CacheType>
  ) => {
    if (!interaction.isChatInputCommand()) return;

    const { commandName, reply } = interaction;

    if (commandName === "ping") {
      await reply("Pong!");
    }
  };

  private connect = async (): Promise<BayView | undefined> => {
    await BayView.rest.put(
      Routes.applicationCommands(process.env.DISCORD_CLIENT_ID!),
      {
        body: BayView.commands
      }
    );

    console.log("Successfully reloaded application (/) commands.");

    await this.client.login(process.env.DISCORD_API_TOKEN);

    return this;
  };

  static init = async () => {
    if (!this.instance) {
      this.instance = new BayView();

      try {
        await this.instance.connect();
        console.log("BayView initialized.");
      } catch (err) {
        console.error(
          "Unable to initialize BayView:\n\t",
          (err as Error).message
        );
        process.exit(0);
      }
    }
    
    return this.instance;
  };
}

//export default BayView;
