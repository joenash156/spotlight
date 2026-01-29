import { AuthConfig } from "convex/server";

export default {
  providers: [
    {
      domain: "https://large-raccoon-75.clerk.accounts.dev",
      applicationID: "convex",
    },
  ]
} satisfies AuthConfig;
