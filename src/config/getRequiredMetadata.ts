import { User } from "supertokens-node";
import {
  DiscordResponse,
  FacebookResponse,
  GithubResponse,
  GoogleResponse,
} from "./types";
import { SessionContainer } from "supertokens-node/recipe/session";
import { generateFromEmail } from "unique-username-generator";
export type RequiredMetadata = {
  username: string;
  first_name: string;
  last_name: string;
  avatar_url: string;
};

type SuperTokensResponse = {
  status: "OK";
  createdNewRecipeUser: boolean;
  user: User;
  session: SessionContainer;
  oAuthTokens: {
    [key: string]: any;
  };
  rawUserInfoFromProvider: {
    fromIdTokenPayload?:
      | {
          [x: string]: any;
        }
      | undefined;
    fromUserInfoAPI?:
      | {
          [x: string]: any;
        }
      | undefined;
  };
};

const getPrimaryLoginMethod = (response: SuperTokensResponse) => {
  const { user } = response;

  const { loginMethods } = user;

  return loginMethods[0];
};

export const getUserInfoFromAPI = (response: SuperTokensResponse) => {
  const { rawUserInfoFromProvider } = response;

  return rawUserInfoFromProvider.fromUserInfoAPI;
};

export const getRequiredMetadata = async (
  response: SuperTokensResponse,
  fromUserInfoAPI?: {
    [x: string]: any;
  }
): Promise<RequiredMetadata> => {
  let data = {} as RequiredMetadata;

  const method = getPrimaryLoginMethod(response);

  switch (method.thirdParty?.id) {
    case "facebook": {
      const { access_token } = response.oAuthTokens;

      const res = await fetch(
        `https://graph.facebook.com/v18.0/me?fields=id,name,age_range,first_name,last_name,email,picture{url}&access_token=${access_token}`
      );

      const resp = (await res.json()) as FacebookResponse;

      const username = generateFromEmail(resp.email);

      const { first_name, last_name } = resp;
      const avatar_url = resp.picture.data.url;

      data = {
        username,
        first_name,
        last_name,
        avatar_url,
      };

      break;
    }
    case "discord": {
      const { id, username, avatar, global_name } =
        fromUserInfoAPI as DiscordResponse;

      const avatar_url = `https://cdn.discordapp.com/avatars/${id}/${avatar}/size=128`;
      const [first_name, last_name] = [global_name, ""];

      data = {
        username,
        first_name,
        last_name,
        avatar_url,
      };
      break;
    }
    case "google": {
      const { given_name, family_name, email, picture } =
        fromUserInfoAPI as GoogleResponse;

      const username = generateFromEmail(email);
      const [first_name, last_name] = [given_name, family_name];

      data = {
        username,
        first_name,
        last_name,
        avatar_url: picture,
      };

      break;
    }
    case "github": {
      const { login, name, avatar_url } = (
        fromUserInfoAPI as GithubResponse
      ).user;

      const [first_name, last_name] = name.split(" ");
      data = {
        username: login,
        first_name,
        last_name,
        avatar_url,
      };
    }
    default:
      break;
  }

  return data;
};
