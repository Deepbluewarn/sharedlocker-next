'use server'

import { cookies } from "next/headers"

export default async function fetchUserInfo() {
    const cookieStore = cookies()
    
    const fetch_res = await fetch(`${process.env.API_BASE_URL}/api/user`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${cookieStore.get(process.env.ACCESS_TOKEN_COOKIE_NAME!)?.value}`,
            'Content-Type': 'application/json',
        },
        cache: 'no-cache',
    });

    return fetch_res.json()
}
