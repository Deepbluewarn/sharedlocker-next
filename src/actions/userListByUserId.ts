'use server'

import { cookies } from "next/headers";

export async function fetchUserListByUserId(userId: string) {
    const cookieStore = cookies()

    const res = await fetch(`${process.env.API_BASE_URL}/api/users`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${cookieStore.get(process.env.ACCESS_TOKEN_COOKIE_NAME!)?.value}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({userId}),
    });

    return res.json()
}

export async function userListByUserId(prevState: {userList: any[]}, formData: FormData) {
    const fetch_res = await fetchUserListByUserId(formData.get('userId') as string)

    console.log('userListByUserId fetch_res Response:', fetch_res.message)

    if (!fetch_res.success) {
        return prevState
    }

    prevState.userList = fetch_res.message

    return prevState
}