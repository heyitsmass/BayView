import { useRouter } from "next/navigation";
import { SuperTokensConfig } from "supertokens-auth-react/lib/build/types";
import SessionReact from "supertokens-auth-react/recipe/session";
import ThirdPartyEmailPasswordReact from "supertokens-auth-react/recipe/thirdpartyemailpassword";
import { appInfo } from "./appInfo";
import { SocialButton } from "./buttons";

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
        useShadowDom: false,
        style: `
   
          [data-supertokens~="container"] { 
            font-family: "Barlow",
            font-size: 0.9rem;
            --palette-background: 39, 39, 42;
            --palette-textPrimary: 255, 255, 255;
            --palette-textTitle: 255, 255, 255;
            --palette-textLabel: 255, 255, 255;
            --palette-textInput: 255, 255, 255;
            --palette-inputBorder: 190, 18, 60;
            --palette-primaryBorder: 190, 18, 60;
            --palette-primary: 159, 18, 57;
            --palette-inputBackground: 63, 63, 70;
            --palette-superTokensBrandingBackground: 63, 63, 70;
            width: 600px;
            height: min-content; 
          }

          [data-supertokens~="row"] { 
            padding-bottom: 0; 
          }

          [data-supertokens~="providerContainer"] {
            width: 25%;
            float: left; 
          }
          [data-supertokens~="providerContainer"] div {
            background: rgb(159, 18, 57);
            transition: 0.2s ease-in-out;
          }

          [data-supertokens~="inputWrapper"]{
            height: 44px; 
            border-radius: 4em; 
            padding-right: 1rem;
          }

          [data-supertokens~="input"]{
            padding: 1rem;

          }


          [data-supertokens~="providerContainer"] div:hover{

            cursor:pointer;
            transform: scale(105%);
            box-shadow: 0 0 8px -2px black; 
          }

          [data-supertokens~="providerContainer"]:not(:nth-child(7)){
            padding-right: .5rem;
          }

          [data-supertokens~="container"] * form {  
            display: grid; 
            grid-template-columns: repeat(2, 1fr);
            gap: 0 .5rem;
          }

          [data-supertokens~="formRow"] {
            padding-bottom: 16px; 
          }

          [data-supertokens~="formRow"]:last-child {
            padding-top: 16px;
            grid-column-end: span 2;  
          }

          [data-supertokens~="formRow"]:first-child {
            grid-column-end: span 2;  
          }

          [data-supertokens~="formRow"]:nth-child(2) {
            grid-column-end: span 2;  
          }
         
          [data-supertokens~="thirdPartyEmailPasswordDivider"]{
            clear:both; 
            margin-bottom: .5rem;
          }
        `,

        signInAndUpFeature: {
          providers: [
            ThirdPartyEmailPasswordReact.Google.init({
              buttonComponent: () => SocialButton({ recipe: "google" })
            }),
            ThirdPartyEmailPasswordReact.Facebook.init({
              buttonComponent: () => SocialButton({ recipe: "facebook" })
            }),
            ThirdPartyEmailPasswordReact.Github.init({
              buttonComponent: () => SocialButton({ recipe: "github" })
            }),
            ThirdPartyEmailPasswordReact.Discord.init({
              buttonComponent: () => SocialButton({ recipe: "discord" })
            })
          ],

          signUpForm: {
            privacyPolicyLink: "https://www.bayview.dev/policies/privacy",
            termsOfServiceLink: "https://www.bayview.dev/policies/terms",
            formFields: [
              {
                id: "username",
                label: "Username",
                placeholder: "Username...",
                optional: true
              },
              {
                id: "first_name",
                label: "First Name",
                placeholder: "First Name..."
              },
              {
                id: "last_name",
                label: "Last Name",
                placeholder: "Last Name...",
                optional: true
              },
              {
                id: "phone",
                label: "Phone",
                placeholder: "Phone...",
                optional: true
              }
            ]
          }
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
        }
      }),
      SessionReact.init()
    ],
    windowHandler: (original) => ({
      ...original,
      location: {
        ...original.location,
        getPathName: () => routerInfo.pathName!,
        assign: (url) => routerInfo.router!.push(url.toString()),
        setHref: (url) => routerInfo.router!.push(url.toString())
      }
    })
  };
};
