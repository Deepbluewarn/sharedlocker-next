import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { saltAndHashPassword } from "@/utils/password"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                id: {},
                password: {},
                email: {},
            },
            authorize: async (credentials, request) => {
                if (!credentials?.id || !credentials?.password) {
                    throw new Error('Missing credentials')
                }
                let user = null

                const pwHash = await saltAndHashPassword(credentials.password as string)

                user = {
                    name: credentials.id as string,
                    email: credentials.email as string
                }

                if (!user) {
                    throw new Error('No user found')
                }

                return user
            },
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.user = user
            }
            
            return token
        },
    }
})