'use server'

import { IUserInfo } from "@/components/user/UserInfo";
import { cookies } from "next/headers";

export async function fetchUserListByNickname(nickname: string) {
    const cookieStore = cookies()

    const res = await fetch(`${process.env.API_BASE_URL}/api/users`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${cookieStore.get(process.env.ACCESS_TOKEN_COOKIE_NAME!)?.value}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({nickname}),
    });

    return res.json()
}

export default async function UserListByNickname(prevState: {userList: IUserInfo[]}, formData: FormData) {
    const fetch_res = await fetchUserListByNickname(formData.get('nickname') as string)

    console.log('UserListByNickname fetch_res Response:', fetch_res)

    prevState.userList = fetch_res.message

    return prevState
}