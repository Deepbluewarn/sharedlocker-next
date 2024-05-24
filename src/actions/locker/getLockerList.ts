import IApiResponse from "@/interfaces/api";
import FetchWrapper from "../fetch-wrapper";
import { ILockerInfoList } from "@/interfaces/api/locker";

export async function fetchLockerList(buildingNumber: number, floor: number): Promise<IApiResponse<string, ILockerInfoList>> {
    return FetchWrapper(`${process.env.API_BASE_URL}/api/lockers?buildingNumber=${buildingNumber}&floor=${floor}`, {
        method: 'GET',
    }).then(res => res.json())
}
