'use server'

import { IUserInfo } from "@/interfaces/api/user";
import { cookies } from "next/headers";
import FetchWrapper from "../fetch-wrapper";
import IApiResponse from "@/interfaces/api";

export async function fetchUserListByNickname(nickname: string): Promise<IApiResponse<string, IUserInfo[]>> {
    const cookieStore = cookies()

    return await FetchWrapper(`${process.env.API_BASE_URL}/api/users`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${cookieStore.get(process.env.ACCESS_TOKEN_COOKIE_NAME!)?.value}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({nickname}),
    }).then(res => res.json())
}

export default async function UserListByNickname(prevState: IApiResponse<string, IUserInfo[]> | null, formData: FormData) {
    const fetch_res = await fetchUserListByNickname(formData.get('nickname') as string)

    return fetch_res
}