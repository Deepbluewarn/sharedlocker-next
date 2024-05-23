'use server'

import { cookies } from "next/headers"

export async function fetchAdmin() {
    const cookieStore = cookies()

    const res = await fetch(`${process.env.API_BASE_URL}/api/admin`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Authorization': `Bearer ${cookieStore.get(process.env.ACCESS_TOKEN_COOKIE_NAME!)?.value}`,
            'Content-Type': 'application/json',
        },
    })
    return res.json()
}
