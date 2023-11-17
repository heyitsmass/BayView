let base = {
  apiDomain: "http://localhost:3000",
  websiteDomain: "http://localhost:3000",
};

if (process.env.NODE_ENV === "production") {
  base = {
    apiDomain: process.env.VERCEL_URL!,
    websiteDomain: process.env.VERCEL_URL!,
  };
}
export const appInfo = {
  // learn more about this on https://supertokens.com/docs/thirdpartyemailpassword/appinfo
  ...base,
  appName: "BayView",
  apiBasePath: "/api/auth",
  websiteBasePath: "/auth",
};
