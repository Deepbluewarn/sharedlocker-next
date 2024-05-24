import IApiResponse from "@/interfaces/api"
import FetchWrapper from "../fetch-wrapper"
import { IFloors } from "@/interfaces/api/locker"

export async function fetchFloorListByBuildingNumber(buildingNumber: number): Promise<IApiResponse<string, IFloors>> {
    return FetchWrapper(`${process.env.API_BASE_URL}/api/locker/floor?buildingNumber=${buildingNumber}`, {
        method: 'GET',
    }).then(res => res.json())
}
