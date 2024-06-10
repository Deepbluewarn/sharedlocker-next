'use server'

import cookie from 'cookie'
import { cookies } from "next/headers"
import FetchWrapper from '../fetch-wrapper'
import IApiResponse from '@/interfaces/api'
import { IToken } from '@/interfaces/api/auth'

async function fetchSignIn(formData: FormData): Promise<IApiResponse<string, IToken>> {
    const cookieStore = cookies()
    
    return await FetchWrapper(`${process.env.API_BASE_URL}/auth/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: formData.get('id'),
            password: formData.get('password'),
        }),
    }).then((res) => {
        console.log(res.headers.getSetCookie())

        const cookies = res.headers.getSetCookie()

        cookies.forEach(c => {
            const parsedCookie = cookie.parse(c);
            const [firstPair, ...rest] = c.split('; ');
            const [key, value] = firstPair.split('=');
            
            cookieStore.set(key, value, {
                httpOnly: true,
                secure: true,
                path: '/',
                sameSite: 'strict',
            });
        })

        return res.json()
    })
}

export default async function signIn(prevState: IApiResponse<string, IToken> | null, formData: FormData) {
    let response = null;

    try {
        response = await fetchSignIn(formData)
    } catch (error) {
        throw error;
    }

    return response;
}