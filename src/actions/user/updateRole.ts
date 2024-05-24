'use server'

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import FetchWrapper from "../fetch-wrapper";
import IApiResponse from "@/interfaces/api";

export async function fetchUpdateRole(userId: string, role: string, assignedLockerBuilding: string): Promise<IApiResponse<string, null>> {
    const cookieStore = cookies()

    const res = await FetchWrapper(`${process.env.API_BASE_URL}/api/user/role`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${cookieStore.get(process.env.ACCESS_TOKEN_COOKIE_NAME!)?.value}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, role, assignedLockerBuilding }),
    });

    return res.json()
}

export default async function UpdateRoleForm(prevState: string, formData: FormData) {
    const userId = formData.get('userId') as string
    const selectedRole = formData.get('selectedRole') as string
    const assignedLockerBuilding = formData.get('assignedLockerBuilding') as string


    const fetch_res = await fetchUpdateRole(userId, selectedRole, assignedLockerBuilding)

    console.log('UpdateRoleForm fetch_res Response:', fetch_res)

    revalidatePath('/')

    return fetch_res.message
}