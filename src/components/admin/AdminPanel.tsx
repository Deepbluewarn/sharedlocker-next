import { fetchAdmin } from "@/actions/getAdmin";
import UpdateRole from "./UpdateRole";
import adminPanelStyles from '@/styles/admin/adminPanel.module.css'
import { IRole, fetchRoleList } from "@/actions/roleList";

export default async function AdminPanel() {
    const admin = await fetchAdmin();
    const roles_res = await fetchRoleList()
    const roles = roles_res.message as IRole[]

    return (
        <>
            <div className={adminPanelStyles.container}>
                <h1>Admin Panel</h1>
                {
                    admin.success ? (
                        <UpdateRole roles={roles}/>
                    ) : (
                        <p>관리자 권한이 없습니다.</p>
                    )
                }
            </div>
        </>

    )
}