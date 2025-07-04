import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "./db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import type { NextAuthOptions } from "next-auth/index";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        identifier: { label: "Email or Password", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.identifier) {
          throw new Error("Missing email or username");
        }
        if (!credentials?.password) {
          throw new Error("Missing password from credentials");
        }
        try {
          const identifier = credentials.identifier?.trim().toLowerCase();

          await connectToDatabase();
          const user = await User.findOne({
            $or: [{ email: identifier }, { username: identifier }],
          });

          if (!user) {
            throw new Error("No user found with the email");
          }

          const isValid = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!isValid) {
            throw new Error("Password didn't match");
          }
          return {
            id: user._id.toString(),
            email: user.email,
            username: user.username,
            isAdmin: user.isAdmin,
          };
        } catch (error) {
          throw error;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  // callbacks: {
  //   async jwt({ token, user }: { token: any; user?: any }) {
  //     if (user) {
  //       token.id = user.id;
  //       token.isAdmin = (user as any).isAdmin;
  //     }
  //     return token;
  //   },
  //   async session({ session, token }: { session: any; token: any }) {
  //     if (session.user) {
  //       session.user.id = token.id as string;
  //       session.user.isAdmin = token.isAdmin as boolean;
  //     }
  //     return session;
  //   },
  // },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.isAdmin = user.isAdmin;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.username = token.username as string;
        session.user.isAdmin = token.isAdmin as boolean;
      }
      return session;
    },
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
};
