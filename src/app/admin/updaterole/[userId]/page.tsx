import { fetchAdmin } from "@/actions/getAdmin";
import { IRole, fetchRoleList } from "@/actions/roleList";
import fetchUserInfoByUserId from "@/actions/userInfoByUserId";
import UserInfo from "@/components/user/UserInfo";


function RoleSelector(props: { roles: IRole[], defaultValue: string }) {
    return (
        <select name='selectedRole' defaultValue={props.defaultValue}>
            {
                props.roles.map((role) => (
                    <option key={role.role} value={role.role}>{role.name}</option>
                ))
            }
        </select>
    )
}
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

    return (
        <div>
            <h1>회원 역할 수정</h1>
            <h4>관리자 역할을 부여하거나 수정할 수 있습니다.</h4>
            <p>userId: {userId}</p>
            <UserInfo user={user}/>

            <h3>담당 보관함 선택</h3>

            <form >
                {`${user.nickname} (${user.userId}) 님의 역할을 `}
                <RoleSelector roles={roles} defaultValue={user.role} />로
                <button>저장</button>
            </form>
        </div>
    )
}