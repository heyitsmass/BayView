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
⛔ **If you *EVER* need to access [environment variables](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables) while programming, only use the environment variables**  `process.env.DISCORD_API_TOKEN` **and**  `process.env.DISCORD_CLIENT_ID`. **DO NOT copy and paste them outside of the**  `.env` **file.** 

### Step 2: 

```chmod +x start && ./start```

📍<b> *This will create a `.built` file with the build date/time stamped into it, Subsequent calls to ./start will only initialize a new container from the previous image. To update dependencies, pass the `-b|--build` option to rebuild the image or `-h|--help` to display the help menu*</b>

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
bayview-development  | ✓ Compiled /instrumentation in 177ms (48 modules)
bayview-development  | ▲ Next.js 13.X.X
bayview-development  | - Local:        http://localhost:3000
bayview-development  | - Environments: .env
bayview-development  | - Experiments (use at your own risk):
bayview-development  |    · esmExternals
bayview-development  |    · serverActions
bayview-development  |    · instrumentationHook
bayview-development  | 
bayview-development  | ✓ Ready in 2.2s
```

### Step 4: 

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result, you should be redirected to the `/home` page indicating proper initialization.

⚠️For best results use [FireFox Developer Edition](https://www.mozilla.org/en-US/firefox/developer/) with the [React DevTools](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/) addon.

### Additional Notes: 
[FastRefresh](https://nextjs.org/docs/architecture/fast-refresh) is enabled for the development environment, As long as the server is running then any changes made to files within the original source directory will force the server to recompile. This allows you to quickly and seamlessly update the website during development and see those updates in real-time without have to rebuild the entire Docker container. Check the `docker-compose.yml` file for more information. 

The only changes that will require a restart are made to or 'package.json' while updating dependencies or to the [`instrumentation.ts`](https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation) file which runs when a new server instance is bootstrapped. 
  - This initializes database connections and performs any work that's necessary throughout the lifetime of the website but only needs to occur once. 

## Design Expectations
It is expected these design patterns will be followed upon contributing to the repo, These patterns are intended to make portability, extension and expansion of BayView simple and legible. 

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

#### Disney 
    A request has been made to acquire licensing permission for intellectual property of Baymax. Please have a representative of Disney Enterprises or their Legal Team respond to the inquiry for immediate removal of the imagery, any notice for DMCA should be sent to contact@heyitsmass.dev if any intellectual property rights have been violated before a response has been generated. 

#### For any additional inquiries please reach out at contact@heyitsmass.dev
