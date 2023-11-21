const URL =
  process.env.NODE_ENV === "production"
    ? `https://bayview.dev`
    : "http://localhost:3000/";

export const appInfo = {
  // learn more about this on https://supertokens.com/docs/thirdpartyemailpassword/appinfo
  apiDomain: URL,
  websiteDomain: URL,
  appName: "BayView",
  apiBasePath: "/api/auth",
  websiteBasePath: "/auth",
};
