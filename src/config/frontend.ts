import { useRouter } from "next/navigation";
import { SuperTokensConfig } from "supertokens-auth-react/lib/build/types";
import SessionReact from "supertokens-auth-react/recipe/session";
import ThirdPartyEmailPasswordReact from "supertokens-auth-react/recipe/thirdpartyemailpassword";
import { appInfo } from "./appInfo";

const routerInfo: {
  router?: ReturnType<typeof useRouter>;
  pathName?: string;
} = {};

export function setRouter(
  router: ReturnType<typeof useRouter>,
  pathName: string
) {
  routerInfo.router = router;
  routerInfo.pathName = pathName;
}

export const frontendConfig = (): SuperTokensConfig => {
  return {
    appInfo,
    recipeList: [
      ThirdPartyEmailPasswordReact.init({
        signInAndUpFeature: {
          providers: [
            ThirdPartyEmailPasswordReact.Google.init(),
            ThirdPartyEmailPasswordReact.Facebook.init(),
            ThirdPartyEmailPasswordReact.Github.init(),
            ThirdPartyEmailPasswordReact.Discord.init(),
          ],
          signUpForm: {
            formFields: [
              {
                id: "username",
                label: "Username",
                placeholder: "Username...",
                optional: true,
              },
              {
                id: "first_name",
                label: "First Name",
                placeholder: "First Name...",
              },
              {
                id: "last_name",
                label: "Last Name",
                placeholder: "Last Name...",
                optional: true,
              },
              {
                id: "phone",
                label: "Phone",
                placeholder: "Phone...",
                optional: true,
              },
              {
                id: "discord",
                label: "Discord",
                placeholder: "Discord...",
                optional: true,
              },
            ],
          },
        },
        getRedirectionURL: async (context) => {
          switch (context.action) {
            case "SUCCESS":
              const { redirectToPath } = context;
              if (redirectToPath !== undefined) {
                return redirectToPath;
              }

              /* 
              if (context.isNewRecipeUser && context.user.loginMethods.length === 1) { 

              } else { 

              } */
              return "/home";

            default:
              return undefined;
          }
        },
      }),
      SessionReact.init(),
    ],
    windowHandler: (original) => ({
      ...original,
      location: {
        ...original.location,
        getPathName: () => routerInfo.pathName!,
        assign: (url) => routerInfo.router!.push(url.toString()),
        setHref: (url) => routerInfo.router!.push(url.toString()),
      },
    }),
  };
};
