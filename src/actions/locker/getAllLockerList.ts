import IApiResponse from "@/interfaces/api";
import { ILocker } from "@/interfaces/api/locker";
import FetchWrapper from "../fetch-wrapper";

export async function fetchAllLockerList(): Promise<IApiResponse<string, ILocker[]>> {
    return FetchWrapper(`${process.env.API_BASE_URL}/api/locker/all`, {
        method: 'GET',
    }).then(res => res.json())
}
