import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      isAdmin: boolean;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    email: string;
    username: string;
    isAdmin: boolean;
  }

  interface JWT {
    id: string;
    username: string;
    isAdmin: boolean;
  }
}

// import { DefaultSession } from "next-auth";

// declare module "next-auth"{
//   interface Session {
//     user:{
//       id:String;
//     } & DefaultSession["user"]
//   }
// }
