'use server'

import { cookies } from "next/headers";
import IApiResponse from "@/interfaces/api";
import FetchWrapper from "../fetch-wrapper";

export async function fetchCreateLocker(formData: FormData): Promise<IApiResponse<string, null>> {
    const cookieStore = cookies()

    const buildingNumber = Number(formData.get('buildingNumber'))
    const floorNumber = Number(formData.get('floorNumber'))
    const lockerNumber = Number(formData.get('lockerNumber'))

    return await FetchWrapper(`${process.env.API_BASE_URL}/api/locker/create`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${cookieStore.get(process.env.ACCESS_TOKEN_COOKIE_NAME!)?.value}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            buildingNumber, floorNumber, lockerNumber
        }),
    }).then(res => res.json())
}

export default async function createLockerAction(prevState: IApiResponse<string, null> | null, formData: FormData) {
    const fetch_res = await fetchCreateLocker(formData)

    return fetch_res
}
