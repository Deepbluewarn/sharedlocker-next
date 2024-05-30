import IApiResponse from "@/interfaces/api";
import FetchWrapper from "../fetch-wrapper";
import { ILockerStructure } from "@/interfaces/api/locker";

export async function fetchLockerStructure(): Promise<IApiResponse<string, ILockerStructure[]>> {
    return await FetchWrapper(`${process.env.API_BASE_URL}/api/locker/structure`, {
        method: 'GET',
        cache: 'no-store',
        next: {
            tags: ['lockerStructure']
        }
    }).then(res => res.json())
}

export default async function getLockerStructureAction(prevState: string) {
    const fetch_res = await fetchLockerStructure()

    if (!fetch_res.success) {
        return prevState
    }

    prevState = fetch_res.message

    return prevState
}
