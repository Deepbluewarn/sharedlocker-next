'use server'

import { cookies } from "next/headers";
import FetchWrapper from "../fetch-wrapper";
import IApiResponse from "@/interfaces/api";
import { IUserInfo } from "@/interfaces/api/user";

export async function fetchUserListByUserId(userId: string): Promise<IApiResponse<string, IUserInfo[]>> {
    const cookieStore = cookies()

    return await FetchWrapper(`${process.env.API_BASE_URL}/api/users`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${cookieStore.get(process.env.ACCESS_TOKEN_COOKIE_NAME!)?.value}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({userId}),
    }).then(res => res.json())
}

export async function userListByUserId(prevState: IApiResponse<string, IUserInfo[]> | null, formData: FormData) {
    const fetch_res = await fetchUserListByUserId(formData.get('userId') as string)
        
    return fetch_res
}