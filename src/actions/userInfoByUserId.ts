'use server'

import { cookies } from "next/headers"

export default async function fetchUserInfoByUserId(userId: string) {
    const cookieStore = cookies()
    
    const fetch_res = await fetch(`${process.env.API_BASE_URL}/api/admin/user?userId=${userId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${cookieStore.get(process.env.ACCESS_TOKEN_COOKIE_NAME!)?.value}`,
            'Content-Type': 'application/json',
        },
    });

    return fetch_res.json()
}
