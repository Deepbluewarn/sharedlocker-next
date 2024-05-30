'use server'

import IApiResponse from "@/interfaces/api";
import FetchWrapper from "../fetch-wrapper";
import { cookies } from "next/headers";
import { revalidatePath, revalidateTag } from "next/cache";
import { ISelectedLocker } from "@/interfaces";

export async function fetchDeleteLocker(formData: FormData): Promise<IApiResponse<string, ISelectedLocker>> {
    const cookieStore = cookies()

    const buildingNumber = Number(formData.get('buildingNumber'))
    const floorNumber = Number(formData.get('floorNumber'))
    const lockerNumber = Number(formData.get('lockerNumber'))

    return await FetchWrapper(
        `${process.env.API_BASE_URL}/api/locker?buildingNumber=${buildingNumber}&floorNumber=${floorNumber}&lockerNumber=${lockerNumber}`,
        {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${cookieStore.get(process.env.ACCESS_TOKEN_COOKIE_NAME!)?.value}`,
                'Content-Type': 'application/json',
            },
        }
    ).then(res => res.json())
}

export default async function deleteLockerAction(prevState: IApiResponse<string, ISelectedLocker> | null, formData: FormData) {
    const fetch_res = await fetchDeleteLocker(formData)
    
    revalidatePath('/admin/lockers/manage')

    return fetch_res
}
