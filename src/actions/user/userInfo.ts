'use server'

import { cookies } from "next/headers"
import FetchWrapper from "../fetch-wrapper";
import IApiResponse from "@/interfaces/api";
import { IUserInfo } from "@/interfaces/api/user";

export default async function fetchUserInfo(): Promise<IApiResponse<string, IUserInfo>> {
    const cookieStore = cookies()
    
    const fetch_res = await FetchWrapper(`${process.env.API_BASE_URL}/api/user`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${cookieStore.get(process.env.ACCESS_TOKEN_COOKIE_NAME!)?.value}`,
            'Content-Type': 'application/json',
        },
    });

    return fetch_res.json()
}
