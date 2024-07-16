'use server'

import IApiResponse from "@/interfaces/api";
import FetchWrapper from "../fetch-wrapper";
import { cookies } from "next/headers";

export async function fetchDeleteUser(formData: FormData): Promise<IApiResponse<string, null>> {
    const cookieStore = cookies()
    
    return await FetchWrapper(`${process.env.API_BASE_URL}/auth/user/delete`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${cookieStore.get(process.env.ACCESS_TOKEN_COOKIE_NAME!)?.value}`,
        },
        body: JSON.stringify({
            userId: formData.get('userId')
        })
    }).then(res => res.json());
    
}
export default async function deleteUser(prevState: IApiResponse<string, null> | null, formData: FormData) {
    let response = null;

    try {
        response = await fetchDeleteUser(formData)
    } catch (error) {
        throw error;
    }

    return response;
}
