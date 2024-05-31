'use server'

import { cookies } from "next/headers"
import FetchWrapper from "../fetch-wrapper";
import IApiResponse from "@/interfaces/api";
import { IUserInfo } from "@/interfaces/api/user";

export default async function fetchUserInfoByUserId(userId: string): Promise<IApiResponse<string, IUserInfo>> {
    const cookieStore = cookies()
    
    return await FetchWrapper(`${process.env.API_BASE_URL}/api/admin/user?userId=${userId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${cookieStore.get(process.env.ACCESS_TOKEN_COOKIE_NAME!)?.value}`,
            'Content-Type': 'application/json',
        },
    }).then(res => res.json())
}
