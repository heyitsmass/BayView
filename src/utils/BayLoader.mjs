import { REST, Routes, ShardClientUtil } from "discord.js";
import { Client, GatewayIntentBits } from "discord.js";

export const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on("ready", () => {
  const { shard } = client;

  if (shard) {
    const { parentPort, application } = shard;

    console.log(
      `Shard Id: ${application.id}, Parent Port(s): ${
        parentPort || "(80 & 443)"
      }`
    );
  }
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "ping") {
    await interaction.reply("Pong!");
  }
});

const rest = new REST({ version: "10" }).setToken(
  process.env.DISCORD_API_TOKEN
);

const commands = [
  {
    name: "ping",
    description: "Replies with Pong!"
  }
];

const BayLoader = async () => {
  try {
    await rest.put(
      Routes.applicationCommands(process.env.DISCORD_CLIENT_ID),
      {
        body: commands
      }
    );

    console.log("Successfully reloaded application (/) commands.");

    await client.login(process.env.DISCORD_API_TOKEN);
  } catch (err) {
    const { message } = err;

    return {
      error: true,
      message
    };
  }

  return {
    ok: true,
    message: "Bot has been initialized."
  };
};

if (!client.isReady()) 
  await BayLoader();

export default BayLoader;
