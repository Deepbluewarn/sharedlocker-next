import { fetchAdmin } from "@/actions/admin/getAdmin";
import { fetchBuildingList } from "@/actions/locker/getBuildingList";
import { fetchRoleList } from "@/actions/admin/roleList";
import fetchUserInfoByUserId from "@/actions/admin/userInfoByUserId";
import UpdateRole from "@/components/admin/UpdateRole";
import UserInfo from "@/components/user/UserInfo";
import { IBuildingInfo } from "@/interfaces/api/locker";
import DeleteUser from "@/components/admin/DeleteUser";

export default async function UpdateRolePage({params: {userId}}: {params: {userId: string}}) {
    // 운영 관리자 권한 확인
    const admin = await fetchAdmin();

    if (!admin || !admin.success) {
        return <p>{admin.message}</p>
    }

    const roles_res = await fetchRoleList()
    const roles = roles_res.value
    
    const user_res = await fetchUserInfoByUserId(userId);
    const user = user_res.value

    const building_res = await fetchBuildingList()

    console.log(building_res)
    const buildings: IBuildingInfo[] = building_res.value

    return (
        <div>
            <UserInfo user={user}/>

            <UpdateRole roles={roles} user={user} lockerBuildingList={buildings}/>

            <DeleteUser user={user}/>
        </div>
    )
}
