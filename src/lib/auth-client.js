import { adminClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
const baseURL = process.env.BETTER_AUTH_URL;
export const authClient = createAuthClient({
  baseURL: baseURL,
  plugins: [adminClient()],
});

export const { signIn, signUp, useSession } = authClient;
