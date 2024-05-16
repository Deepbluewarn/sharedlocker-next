import { IRole } from "@/actions/roleList";

export default function RoleSelector({ roles } : {roles: IRole[]}) {
    return (
        <div>
            <select>
                {
                    roles.map((role) => (
                        <option key={role.role} value={role.role}>{role.name}</option>
                    ))
                }
            </select>
        </div>
    )
}
