import NextAuth from "next-auth"

interface User {
    name: string
    email: string
    role: 'user' | 'operator' | 'admin'
}
declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: User & DefaultSession["user"],
        error?: "RefreshAccessTokenError"
    }
    interface User {
        name: string
        email: string
        role: 'user' | 'operator' | 'admin'
    }
}

import { JWT } from "next-auth/jwt"
 
declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    user: User
  }
}