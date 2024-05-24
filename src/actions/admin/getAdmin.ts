'use server'

import { cookies } from "next/headers"
import FetchWrapper from "../fetch-wrapper"
import IApiResponse from "@/interfaces/api"

export async function fetchAdmin(): Promise<IApiResponse<string, null>> {
    const cookieStore = cookies()

    const res = await FetchWrapper(`${process.env.API_BASE_URL}/api/admin`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Authorization': `Bearer ${cookieStore.get(process.env.ACCESS_TOKEN_COOKIE_NAME!)?.value}`,
            'Content-Type': 'application/json',
        },
    })
    return res.json()
}
