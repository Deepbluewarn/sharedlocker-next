'use server'

import IApiResponse from "@/interfaces/api";
import FetchWrapper from "../fetch-wrapper";
import { ILockerDetail } from "@/interfaces/api/locker";

export async function fetchLockerDetail(buildingNumber: number, floor: number, lockerNumber: number): Promise<IApiResponse<string, ILockerDetail[]>> {
    return await FetchWrapper(
        `${process.env.API_BASE_URL}/api/locker?buildingNumber=${buildingNumber}&floor=${floor}&lockerNumber=${lockerNumber}`, 
    {
        method: 'GET',
        cache: 'no-store'
    }).then(res => res.json())
}

export default async function getLockerDetailAction(prevState: IApiResponse<string, ILockerDetail[]> | null, formData: FormData) {
    const buildingNumber = Number(formData.get('buildingNumber'))
    const floor = Number(formData.get('floorNumber'))
    const lockerNumber = Number(formData.get('lockerNumber'))
    
    const fetch_res = await fetchLockerDetail(buildingNumber, floor, lockerNumber)

    return fetch_res
}
