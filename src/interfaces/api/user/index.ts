import { IAdmin } from "../admin";
import { IAssignedLocker } from "../locker";

export interface IUserInfo {
    userId: string,
    nickname: string,
    email: string,
    admin: IAdmin,
    createdAt: string,
}
export interface IUserDetailInfo extends IUserInfo{
    assignedLocker: IAssignedLocker[]
}