import { IRole } from "@/interfaces/api/admin";
import { SetStateAction } from "react";

export default function RoleSelector({ roles, selectedRole, setSelectedRole }: {
    roles: IRole[],
    selectedRole: string,
    setSelectedRole: React.Dispatch<SetStateAction<string>>
}) {
    return (
        <select name='selectedRole' onChange={(e) => setSelectedRole(e.target.value)}>
            {
                roles.map((role) => (
                    <option key={role.role} value={role.role}>{role.name}</option>
                ))
            }
        </select>
    )
}
