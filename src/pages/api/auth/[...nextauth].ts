import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { getUser } from "@/requestsToAPI/user";

export const authOptions = {
  // Configure one or more authentication providers
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
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
