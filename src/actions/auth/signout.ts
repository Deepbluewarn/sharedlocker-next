'use server'

import { cookies } from "next/headers"
import { redirect } from "next/navigation";

export async function fetchSignOut() {
    const cookieStore = cookies()
    
    return await fetch(`${process.env.API_BASE_URL}/auth/logout`, {
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
    let response = null
    let message = ''

    try {
        response = await fetchSignOut()
        console.log('SignOut Response:', response)
    } catch (error) {
        message = '서버 에러'
    }

    if (response.success) {
        redirect('/')
    } else {
        message = response.message
    }

    return { message }
}