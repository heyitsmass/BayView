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

Note: The bot will initialize multiple times on the development server due to fastReload. 

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The server will initialize the bot using the `BayLoader` in /src/utils that runs alongside the main web app. 


Disclaimers: 

### Non-Affiliation
```
This web site and internet bot is not endorsed by, directly affiliated with, maintained, authorized, or sponsored by Disney or its subsidaries. All product and company names are the registered trademarks of their original owners. The use of any trade name or trademark is for identification and reference purposes only and does not imply any association with the trademark holder of their product brand.
```

### Fair Use
```
This website utilizes product images from other websites including but not limited to logos, images, or other content publicly provided by manufacturers, advertises and businesses. In doing so, no copyright is claimed for this kind of content on the website. To the extent that such material may appear to be infringed, we assert that such alleged infringement is permissible under the fair use principles of U.S. copyright laws. If you believe any material has been used in an unauthorized manner, please contact us at: brandonc@heyitsmass.dev for immediate removal of any copyrighted material. 
```
