import SuperTokens from "supertokens-node";
import Dashboard from "supertokens-node/recipe/dashboard";
import SessionNode from "supertokens-node/recipe/session";
import ThirdPartyEmailPasswordNode from "supertokens-node/recipe/thirdpartyemailpassword";
import UserMetadata from "supertokens-node/recipe/usermetadata";
import { TypeInput } from "supertokens-node/types";
import { appInfo } from "./appInfo";

import {
  emailPasswordSignUpPOST,
  thirdPartySignInUpPOST,
} from "./handlers";

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
                  scope: [
                    "openid",
                    "https://www.googleapis.com/auth/userinfo.email",
                    "https://www.googleapis.com/auth/userinfo.profile",
                  ],
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
                  scope: ["user"],
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
                  scope: ["email", "identify"],
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
                  scope: ["public_profile", "email", "user_age_range"],
                  additionalConfig: {
                    fields: "id,first_name,last_name,email,user_age_range",
                  },
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
              emailPasswordSignUpPOST: async (input) =>
                emailPasswordSignUpPOST(input, oi),

              thirdPartySignInUpPOST: async (input) =>
                thirdPartySignInUpPOST(input, oi),
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
