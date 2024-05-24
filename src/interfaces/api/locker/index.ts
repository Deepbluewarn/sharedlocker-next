import { IUserInfo } from "../user"

// GET /api/locker/building
export interface IBuildingInfo {
    buildingName: string
    buildingNumber: number
}

export type IFloors = number[]

// GET /api/locker/all
export interface ILocker {
    buildingName: string
    buildingNumber: number
    floorNumber: number
    lockerNumber: number
    status: string,
}

// GET /api/locker
export interface ILockerDetail {
    buildingName: string
    buildingNumber: number
    floorNumber: number
    lockerNumber: number
    status: string
    claimedByUser: IUserInfo[]
    sharedWithUsers: IUserInfo[]
    shareRequestedUsers: IUserInfo[]
}

export interface ILockerInfo {
    lockerNumber: number
    status: string
}

export interface IAssignedLocker {
    buildingNumber: number
    buildingName: string
    lockers: {
        floorNumber: number,
        lockerNumber: number,
        // 아래 필드는 별도의 요청으로 조회.
        // claimedBy: IUserInfo,
        // sharedWith: IUserInfo[]
        // sharedRequested: IUserInfo[]
        status: string
    }
}