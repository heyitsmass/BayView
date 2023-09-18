import { Client, GatewayIntentBits, REST, Routes } from 'discord.js';

type BayViewClient<Ready extends boolean = boolean> = Client<Ready>;

export class __BayView {
  private static client: BayViewClient = new Client({
    intents: [GatewayIntentBits.Guilds]
  });
  private static instance?: __BayView;
  private static readonly token?: string = process.env.DISCORD_API_TOKEN;
  private static readonly clientID?: string = process.env.DISCORD_CLIENT_ID;
  private rest: REST = new REST({
    version: '10'
  }).setToken(__BayView.token!);

  public readonly client = __BayView.client;
  private static commands = [
    {
      name: 'ping',
      description: 'Replies with Pong'!
    }
  ];
  private constructor() {}

  public login = async () => {
    const { token, clientID } = __BayView;

    if (!this.client.readyAt) {
      await this.rest.put(Routes.applicationCommands(clientID!), {
        body: __BayView.commands
      });

      console.log('Successfully reloaded application (/) commands.');

      await this.client.login(token);
    }
    return this as __BayView;
  };

  static init = () => {
    if (!this.token) {
      throw new Error('API token required.');
    }
    return (this.instance ??= new __BayView());
  };
}

try {
  __BayView.init().login();
} catch (err) {
  console.log(err);
}

//shoma: jjordan@seacrestservices.com
