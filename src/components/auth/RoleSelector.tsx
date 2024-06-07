import { IRole } from "@/interfaces/api/admin";
import { NativeSelect, Select } from "@mantine/core";
import { SetStateAction } from "react";

export default function RoleSelector({ roles, selectedRole, setSelectedRole }: {
    roles: IRole[],
    selectedRole: string | null,
    setSelectedRole: React.Dispatch<SetStateAction<string | null>>
}) {
    return (
        <NativeSelect 
            name='selectedRole' 
            label='변경하고자 하는 역할을 선택하세요'
            data={
                roles.map((role) => (
                    {label: role.name, value: role.role}
                ))
            }
            defaultValue={selectedRole || ''}
            onChange={(event) => setSelectedRole(event.currentTarget.value)}
        />
    )
}
