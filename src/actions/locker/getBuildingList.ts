import IApiResponse from "@/interfaces/api"
import FetchWrapper from "../fetch-wrapper"
import { IBuildingInfo } from "@/interfaces/api/locker"

export async function fetchBuildingList(): Promise<IApiResponse<string, IBuildingInfo[]>> {
    return FetchWrapper(`${process.env.API_BASE_URL}/api/locker/building`, {
        method: 'GET',
    }).then(res => res.json())
}
