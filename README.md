This is a [Next.js](https://nextjs.org/) Educational Project that sideloads a discord bot for available Disney Park and sub. reserverations.

## Getting Started

Create a `.env` file in the root directory and add your Discord Bots ClientID & ApplicationID

```
  //.env 

  DISCORD_API_TOKEN=
  DISCORD_CLIENT_ID=

```

First, run the development server:

```bash
npm install

npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The server will initialize the bot using the `BayLoader` in /src/utils that runs alongside the main web app. 
