import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { getUser } from "@/requestsToAPI/user";

export const authOptions = {
  // Configure one or more authentication providers
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    GithubProvider({
      clientId: "d356e568ae6315ba4d51"!,
      clientSecret: "416aba589ff56e4e2b60246b23a472b99877fbe2"!,
    }),
  ],
  callbacks: {
    // https://next-auth.js.org/configuration/callbacks
    async signIn({ user }: any) {
      const result = await getUser(user.email);
      return result.isAdmin; // true - is allowed to login
    },
  },
};

export default NextAuth(authOptions);
