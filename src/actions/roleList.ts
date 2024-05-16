'use server'

import { cookies } from "next/headers";

export interface IRole {
    role: string
    name: string
}

export async function fetchRoleList() {
    const res = await fetch(`${process.env.API_BASE_URL}/api/admin/roles`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${cookies().get(process.env.ACCESS_TOKEN_COOKIE_NAME!)?.value}`,
            'Content-Type': 'application/json',
        },
    })

    return res.json()
}
