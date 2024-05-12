import NextAuth from "next-auth"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "./lib/db"
import Kakao from 'next-auth/providers/kakao'
import { ObjectId } from "mongodb"

export const { handlers, signIn, signOut, auth } = NextAuth({
    session: {
        strategy: 'database',
    },
    adapter: MongoDBAdapter(clientPromise),
    providers: [Kakao({
        clientId: process.env.AUTH_KAKAO_ID,
        clientSecret: process.env.AUTH_KAKAO_SECRET,
        authorization: { params: { access_type: "offline", prompt: "consent" } },
        profile(profile) {

            console.log('profile: ', profile)

            return {
                id: profile.id,
                // name: profile.kakao_account.profile.nickname,
                // email: profile.kakao_account.email,
                // image: profile.kakao_account.profile.profile_image_url,
                role: 'user'
            }
        }
    })],
    callbacks: {
        async session({ session, user }) {
            console.log('callbacks session user: ', user)
            const db = (await clientPromise).db()
            const [kakaoAccount] = await db.collection('accounts').find({ userId: new ObjectId(user.id) }).toArray()

            console.log('callbacks session kakaoAccount: ', kakaoAccount)

            if (kakaoAccount.expires_at * 1000 < Date.now()) {
                try {
                    const response = await fetch('https://kauth.kakao.com/oauth/token', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
                        },
                        body: new URLSearchParams({
                            grant_type: 'refresh_token',
                            client_id: process.env.AUTH_KAKAO_ID!,
                            client_secret: process.env.AUTH_KAKAO_SECRET!,
                            refresh_token: kakaoAccount.refresh_token,
                        }),
                    })

                    const tokens = await response.json()

                    if (!response.ok) throw tokens

                    await db.collection('accounts').updateOne({ userId: new ObjectId(user.id) }, {
                        $set: {
                            access_token: tokens.access_token,
                            expires_at: Math.floor(Date.now() / 1000 + tokens.expires_in),
                            refresh_token: tokens.refresh_token ?? kakaoAccount.refresh_token,
                        }
                    })

                    const data = await response.json()
                    console.log('data: ', data)
                    if (data.access_token) {
                        await db.collection('accounts').updateOne({ userId: new ObjectId(user.id) }, {
                            $set: {
                                access_token: data.access_token,
                                expires_at: Date.now() + data.expires_in,
                            }
                        })
                    }
                } catch (error) {
                    console.error('Failed to refresh token', error)
                    session.error = 'RefreshAccessTokenError'
                }
            }
            session.user.role = user.role
            return session
        },
        signIn({ user, account, profile, email, credentials }) {
            return true
        },
    }
})