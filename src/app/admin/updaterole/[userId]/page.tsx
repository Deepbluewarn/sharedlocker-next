import { fetchAdmin } from "@/actions/admin/getAdmin";
import { fetchBuildingList } from "@/actions/locker/getBuildingList";
import { IRole, fetchRoleList } from "@/actions/admin/roleList";
import fetchUserInfoByUserId from "@/actions/admin/userInfoByUserId";
import UpdateRole from "@/components/admin/UpdateRole";
import UserInfo from "@/components/user/UserInfo";

export default async function UpdateRolePage({params: {userId}}: {params: {userId: string}}) {
    // 운영 관리자 권한 확인
    const admin = await fetchAdmin();

    if (!admin.success) {
        return <p>관리자 권한이 없습니다.</p>
    }

    const roles_res = await fetchRoleList()
    const roles = roles_res.message as IRole[]
    
    const user_res = await fetchUserInfoByUserId(userId);
    const user = user_res.message

    const building_res = await fetchBuildingList()

    console.log(building_res)
    const buildings = building_res.value

    return (
        <div>
            <h1>회원 역할 수정</h1>
            <h4>관리자 역할을 부여하거나 수정할 수 있습니다.</h4>
            <p>userId: {userId}</p>
            <UserInfo user={user}/>

            <UpdateRole roles={roles} user={user} lockerBuildingList={buildings}/>
        </div>
    )
}