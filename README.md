# Getting Started
## Prerequisites: 

[Docker](https://docs.docker.com/get-docker/)


## Usage:
### Step 1: 
Included is an automation script `./start` that composes the website's development environment using [Docker](https://docs.docker.com/get-docker/)

Once Docker has been installed, From the root directory: 

```
git clone https://github.com/heyitsmass/BayView && cd BayView && touch.env
```
If you on the development team, then download the key from the Development Discord. If you are not on the development team your ID will not be whitelisted and you cannot access the key.
 
If you would like to create your own bot using this project as a template then follow [Discord Developer Guide](https://discord.com/developers/docs/getting-started) to obtain your own API Token and Client ID. 

🚫 **These tokens should never leave the** `.env` **file nor should the ".env" entry in** `.gitignore` **file be removed to avoid exposing them.** 

⚠️**Pushing an API key to GitHub will activate Discords watchdog and force [Wumpus](https://discord.fandom.com/wiki/Wumpus) to notify the developer that the key has been exposed. This not only requires the key to be reset and redistributed but also a hard reset back to the parent commit to clear the old key from the commit history.** 

⛔ **If you *EVER* need to access these variables while programming, only use the environment variables**  `process.env.DISCORD_API_TOKEN` **and**  `process.env.DISCORD_CLIENT_ID`. **DO NOT copy and paste them outside of the**  `.env` **file.** 

For more information on environment variables see the [next.js documentation](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)
 
### Step 2: 

You can either perform this step using a text editor like `gedit` or `vim` if preferred or: 
```
echo DISCORD_API_TOKEN=<API_TOKEN>\nDISCORD_CLIENT_ID=<CLIENT_ID> >> .env
```
Your `.env` file should look like 
```
DISCORD_API_TOKEN=<API_TOKEN>
DISCORD_CLIENT_ID=<CLIENT_ID>
```
📍 <b>*The bot will initialize multiple times on the development environment due to FastReload. This can be ignored and is not reproduced in the production environment*</b>

### Step 3: 
From here you are ready to build and run Docker image 

```chmod +x ./start && ./start```

📍<b> *This will create a `.built` file with the build date/time stamped into it, Subsequent calls to ./start will only initialize a new container from the previous image. Pass the `-b|--build` option to rebuild the image or `-h|--help` to display the help menu*</b>

Your output should be similar to: 

```
[+] Building 1.8s (18/18) FINISHED														
...
[+] Running 1/1
✔ Container bayview-development  Created                                                      		
Attaching to bayview-development
bayview-development  |
bayview-development  | > disney-discord-bot@0.1.0 dev
bayview-development  | > next dev
bayview-development  |
bayview-development  | - info Loaded env from /app/.env
bayview-development  | - ready started server on [::]:3000, url: http://localhost:3000
bayview-development  | - event compiled client and server successfully in 89 ms (20 modules)
bayview-development  | - wait compiling /instrumentation (client and server)...
bayview-development  | - event compiled successfully in 21 ms (42 modules)
bayview-development  | Successfully reloaded application (/) commands.
bayview-development  | Logged in as <Bot_Name#Bot_Discriminator>!
```

### Step 4: 

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result, you should be redirected to the `/home` page indicating proper initialization.

⚠️For best results use [FireFox Developer Edition](https://www.mozilla.org/en-US/firefox/developer/) with the [React DevTools](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/) addon.

If the server responds with `Logged in as ...!` then the bot will be available in Discord. To test this you can use the [Slash command](https://discord.com/developers/docs/interactions/application-commands) `/ping` and the bot should reply. 



![HesAlive](https://i.gyazo.com/88a1904a323b07a3f061f9fa2ad3ed54.png) ![HeResponds](https://i.gyazo.com/d2ec94ec898956ac54c007ea9426e505.png)

### Additional Notes: 
[FastRefresh](https://nextjs.org/docs/architecture/fast-refresh) is enabled for the development environment, As long as the server is running then any changes made to files within the original source directory will force the server to recompile. This allows you to quickly and seamlessly update the website during development and see those updates in real-time without have to rebuild the entire Docker container. Check the `docker-compose.yml` file for more information. 

The only changes that will require a restart are made to the [`instrumentation.ts`](https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation) file which runs when a new server instance is bootstrapped. The slash commands are added into this file so they are only sent to discord once during development instead of every refresh. 

## Design Expectations
It is expected these design patterns will be followed upon contributing to the repo, These patterns are intended to make portability, extension and expansion of BayView simple and legible. 

**⚠️ BayView is a [Singleton](https://refactoring.guru/design-patterns/singleton)!**

**⚠️ [Context](https://react.dev/learn/passing-data-deeply-with-context) is essential!** If you have to pass data or functions deeply within multiple components or across routes then wrap your component in a [Context, create a reducer, develop it's actions](https://react.dev/learn/scaling-up-with-reducer-and-context), assign the state values and export the context for use across multiple modules. 

**⚠️Avoid excessively using useEffect**. [You might not need it](https://react.dev/learn/you-might-not-need-an-effect)

## Issues: 

📍If the server hangs during shutdown attempting to close it with `ctrl+c` then you can either stop it directly from Docker Desktop or open a secondary console window and type `docker kill bayview-development`

📍While potentially unrelated, if you get a `dial unix /var/run/docker.sock: connect: permission denied` error then type `chmod 666 /var/run/docker.sock` and retry

## Disclaimers: 

#### Non-Affiliation
    This web site and internet bot is not endorsed by, directly affiliated with, maintained, authorized, or sponsored by Disney or its subsidaries. All product and company names are the registered trademarks of their original owners. The use of any trade name or trademark is for identification and reference purposes only and does not imply any association with the trademark holder of their product brand.

#### Fair Use
    This website utilizes product images from other websites including but not limited to logos, images, or other content publicly provided by manufacturers, advertises and businesses. In doing so, no copyright is claimed for this kind of content on the website. To the extent that such material may appear to be infringed, we assert that such alleged infringement is permissible under the fair use principles of U.S. copyright laws. If you believe any material has been used in an unauthorized manner, please contact us at: contact@heyitsmass.dev for immediate removal of any copyrighted material.

#### For any additional inquiries please reach out at contact@heyitsmass.dev