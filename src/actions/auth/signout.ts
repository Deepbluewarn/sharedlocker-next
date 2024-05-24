'use server'

import { cookies } from "next/headers"
import { redirect } from "next/navigation";
import FetchWrapper from "../fetch-wrapper";
import IApiResponse from "@/interfaces/api";

export async function fetchSignOut(): Promise<IApiResponse<string, null>> {
    const cookieStore = cookies()
    
    return await FetchWrapper(`${process.env.API_BASE_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Authorization': `Bearer ${cookieStore.get(process.env.ACCESS_TOKEN_COOKIE_NAME!)?.value}`,
            'Content-Type': 'application/json',
        },
    }).then((res) => {
        const json = res.json()
        cookieStore.delete(process.env.ACCESS_TOKEN_COOKIE_NAME!);
        cookieStore.delete(process.env.REFRESH_TOKEN_COOKIE_NAME!);

        return json
    })
}

export default async function signOut(prevState: any, formData: FormData) {
    let message = ''

    try {
        const response = await fetchSignOut()

        if (!response.success) {
            message = response.message
        }
    } catch (error) {
        message = '서버 에러'
    }

    redirect('/')

    return { message }
}