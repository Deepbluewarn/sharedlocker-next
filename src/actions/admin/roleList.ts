'use server'

import { cookies } from "next/headers";
import FetchWrapper from "../fetch-wrapper";
import IApiResponse from "@/interfaces/api";
import { IRole } from "@/interfaces/api/admin";

export async function fetchRoleList(): Promise<IApiResponse<string, IRole[]>> {
    return await FetchWrapper(`${process.env.API_BASE_URL}/api/admin/roles`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${cookies().get(process.env.ACCESS_TOKEN_COOKIE_NAME!)?.value}`,
            'Content-Type': 'application/json',
        },
    }).then(res => res.json())
}
