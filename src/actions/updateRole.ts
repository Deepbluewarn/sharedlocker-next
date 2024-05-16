'use server'

import { IUserInfo } from "@/components/user/UserInfo";
import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export async function fetchUpdateRole(userId: string, role: string) {
    const cookieStore = cookies()

    const res = await fetch(`${process.env.API_BASE_URL}/api/user/role`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${cookieStore.get(process.env.ACCESS_TOKEN_COOKIE_NAME!)?.value}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, role }),
    });

    return res.json()
}

export default async function UpdateRoleForm(prevState: string, formData: FormData) {
    const userId = formData.get('userId') as string
    const selectedRole = formData.get('selectedRole') as string


    const fetch_res = await fetchUpdateRole(userId, selectedRole)

    console.log('UpdateRoleForm fetch_res Response:', fetch_res)

    revalidatePath('/')

    return fetch_res.message
}