'use server'

import IApiResponse from "@/interfaces/api"
import { IUserInfo } from "@/interfaces/api/user"
import { cookies } from "next/headers"
import FetchWrapper from "../fetch-wrapper"

export async function fetchQueryUserList(query: string): Promise<IApiResponse<string, IUserInfo[]>> {
    const cookieStore = cookies()

    return await FetchWrapper(`${process.env.API_BASE_URL}/api/users`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${cookieStore.get(process.env.ACCESS_TOKEN_COOKIE_NAME!)?.value}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({query}),
    }).then(res => res.json())
}

export default async function userListByQuery(prevState: IApiResponse<string, IUserInfo[]> | null, formData: FormData) {
    const fetch_res = await fetchQueryUserList(formData.get('query') as string)

    return fetch_res
}
