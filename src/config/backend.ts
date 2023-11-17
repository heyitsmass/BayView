import SuperTokens from "supertokens-node";
import ThirdPartyEmailPasswordNode from "supertokens-node/recipe/thirdpartyemailpassword";
import SessionNode from "supertokens-node/recipe/session";
import { appInfo } from "./appInfo";
import { TypeInput } from "supertokens-node/types";
import Dashboard from "supertokens-node/recipe/dashboard";
import UserMetadata from "supertokens-node/recipe/usermetadata";
import ItineraryModel from "@/models/Itinerary";

export const backendConfig = (): TypeInput => {
  return {
    framework: "custom",
    supertokens: {
      // https://try.supertokens.com is for demo purposes. Replace this with the address of your core instance (sign up on supertokens.com), or self host a core.
      connectionURI: process.env.SUPERTOKENS_HOST!,
      apiKey: process.env.SUPERTOKENS_API_KEY!,
    },
    appInfo,
    recipeList: [
      ThirdPartyEmailPasswordNode.init({
        // We have provided you with development keys which you can use for testing.
        // IMPORTANT: Please replace them with your own OAuth keys for production use.
        providers: [
          {
            config: {
              thirdPartyId: "google",
              clients: [
                {
                  clientId: process.env.GOOGLE_CLIENT_ID!,
                  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
                },
              ],
            },
          },
          {
            config: {
              thirdPartyId: "github",
              clients: [
                {
                  clientId: process.env.GITHUB_CLIENT_ID!,
                  clientSecret: process.env.GITHUB_CLIENT_SECRET!,
                },
              ],
            },
          },
          {
            config: {
              thirdPartyId: "discord",
              clients: [
                {
                  clientId: process.env.DISCORD_CLIENT_ID!,
                  clientSecret: process.env.DISCORD_CLIENT_SECRET!,
                },
              ],
            },
          },
          {
            config: {
              thirdPartyId: "facebook",
              clients: [
                {
                  clientId: process.env.FACEBOOK_CLIENT_ID!,
                  clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
                },
              ],
            },
          },
        ],
        signUpFeature: {
          formFields: [
            {
              id: "username",
            },
            {
              id: "first_name",
            },
            {
              id: "last_name",
            },
            {
              id: "phone",
            },
            {
              id: "discord",
            },
          ],
        },
        override: {
          apis: (oi) => {
            return {
              ...oi,
              emailPasswordSignUpPOST: async function (input) {
                // First we call the original implementation of signUpPOST.
                let response = await oi.emailPasswordSignUpPOST!(input);

                // Post sign up response, we check if it was successful
                if (
                  response.status === "OK" &&
                  response.user.loginMethods.length === 1
                ) {
                  let { id, emails } = response.user;
                  // TODO: sign up successful

                  // here we fetch a custom form field for the user's name.
                  // Note that for this to be available, you need to define
                  // this custom form field.
                  for (let i = 0; i < input.formFields.length; i++) {
                    const name = input.formFields[i].id;
                    const value = input.formFields[i].value;

                    if (name === "email" || name === "password") continue;
                    else if (name === "phone") {
                      response.user.phoneNumbers.push(value);
                      continue;
                    }

                    await UserMetadata.updateUserMetadata(id, {
                      [name]: value,
                    });
                  }

                  let itinerary = await ItineraryModel.exists({
                    id,
                  });

                  if (!itinerary) {
                    console.log("Created itinerary for user");
                    await ItineraryModel.create({
                      id,
                      events: [],
                    });
                  }
                }

                return response;
              },
            };
          },
        },
      }),
      SessionNode.init(),
      Dashboard.init(),
      UserMetadata.init(),
    ],
    isInServerlessEnv: true,
  };
};

let initialized = false;
// This function is used in your APIs to make sure SuperTokens is initialised
export function ensureSuperTokensInit() {
  if (!initialized) {
    SuperTokens.init(backendConfig());
    initialized = true;
  }
}
