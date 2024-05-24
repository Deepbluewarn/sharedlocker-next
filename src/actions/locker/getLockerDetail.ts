import IApiResponse from "@/interfaces/api";
import FetchWrapper from "../fetch-wrapper";
import { ILockerDetail } from "@/interfaces/api/locker";

export async function fetchLockerDetail(buildingNumber: number, floor: number, lockerNumber: number): Promise<IApiResponse<string, ILockerDetail>> {
    return await FetchWrapper(
        `${process.env.API_BASE_URL}/api/locker?buildingNumber=${buildingNumber}&floor=${floor}&lockerNumber=${lockerNumber}`, 
    {
        method: 'GET',
        cache: 'no-store'
    }).then(res => res.json())
}
