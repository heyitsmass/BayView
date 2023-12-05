import ItineraryModel from "@/models/Itinerary";
import {
  APIInterface,
  EmailPasswordAPIOptions,
  ThirdPartyAPIOptions,
  TypeProvider
} from "supertokens-node/recipe/thirdpartyemailpassword";
import UserMetadata from "supertokens-node/recipe/usermetadata";
import {
  getRequiredMetadata,
  getUserInfoFromAPI
} from "./getRequiredMetadata";
import { PartyMember } from "@/types/User";

export const thirdPartySignInUpPOST = async (
  input: {
    provider: TypeProvider;
    tenantId: string;
    options: ThirdPartyAPIOptions;
    userContext: any;
  } & (
    | {
        redirectURIInfo: {
          redirectURIOnProviderDashboard: string;
          redirectURIQueryParams: any;
          pkceCodeVerifier?: string;
        };
      }
    | {
        oAuthTokens: {
          [key: string]: any;
        };
      }
  ),
  oi: APIInterface
) => {
  let response = await oi.thirdPartySignInUpPOST!(input);

  if (
    response.status === "OK" &&
    response.createdNewRecipeUser &&
    response.user.loginMethods.length === 1
  ) {
    let { id } = response.user;

    const fromUserInfoAPI = getUserInfoFromAPI(response);

    const required_metadata = await getRequiredMetadata(
      response,
      fromUserInfoAPI
    );

    for (const key in fromUserInfoAPI) {
      if (key === "email") continue;
      else if (key === "phone") {
        response.user.phoneNumbers.push(fromUserInfoAPI[key]);
        continue;
      }

      await UserMetadata.updateUserMetadata(id, {
        [key]: fromUserInfoAPI[key]
      });
    }

    for (const key in required_metadata) {
      await UserMetadata.updateUserMetadata(id, {
        [key]: required_metadata[key]
      });
    }

    await UserMetadata.updateUserMetadata(id, {
      party: {
        name: "My Party",
        members: []
      }
    });

    let itinerary = await ItineraryModel.exists({
      id
    });

    if (!itinerary) {
      console.log("Created itinerary for user");
      await ItineraryModel.create({
        id,
        events: []
      });
    }
  }
  return response;
};

export const emailPasswordSignUpPOST = async (
  input: {
    formFields: {
      id: string;
      value: string;
    }[];
    tenantId: string;
    options: EmailPasswordAPIOptions;
    userContext: any;
  },
  oi: APIInterface
) => {
  // First we call the original implementation of signUpPOST.
  let response = await oi.emailPasswordSignUpPOST!(input);

  // Post sign up response, we check if it was successful
  if (response.status === "OK" && response.user.loginMethods.length === 1) {
    let _id = response.user.id;
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

      await UserMetadata.updateUserMetadata(_id, {
        [name]: value
      });
    }

    let itinerary = await ItineraryModel.exists({
      _id
    });

    if (!itinerary) {
      console.log("Created itinerary for user");
      await ItineraryModel.create({
        _id,
        events: [],
        party: []
      });
    }
  }
  return response;
};
