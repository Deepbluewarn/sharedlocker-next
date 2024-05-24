import { IAdmin } from "../admin";
import { IAssignedLocker } from "../locker";

export interface IUserInfo {
    userId: string,
    nickname: string,
    email: string,
    role: string,
    createdAt: string,
    admin?: IAdmin,
    assignedLocker?: IAssignedLocker[]
}