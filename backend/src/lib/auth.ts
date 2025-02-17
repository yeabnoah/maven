import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
import { prisma } from "./prisma.config";

console.log("try making it work and try checking the result");

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
  trustedOrigins: ["http://localhost:5000"],
  // advanced: {
  //   crossSubDomainCookies: {
  //     enabled: process.env.NODE_ENV === "production",
  //     domain: process.env.NODE_ENV === "production" ? ".nerdspacer.com" : "",
  //   },
  // },

  advanced: {
    defaultCookieAttributes: {
      sameSite: "none",
      secure: true,
    },
  },
});
