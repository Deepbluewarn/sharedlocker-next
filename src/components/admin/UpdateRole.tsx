'use client'

import { IUserInfo } from "@/interfaces/api/user";
import { IRole } from '@/interfaces/api/admin';
import RoleSelector from '../auth/RoleSelector';
import { useEffect, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import UpdateRoleForm from '@/actions/user/updateRole';
import { IBuildingInfo } from "@/interfaces/api/locker";
import { redirect } from "next/navigation";
import { Button, NativeSelect, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";

const SubmitRoleUpdate = () => {
    const { pending } = useFormStatus()

    return (
        <Button type='submit' disabled={pending}>
            {pending ? '저장 중...' : '저장'}
        </Button>
    )
}
export default function UpdateRole({roles, user, lockerBuildingList} : {
    roles: IRole[],
    user: IUserInfo,
    lockerBuildingList: IBuildingInfo[]
}) {
    // 역할을 수정하는 form 구현
    const [updateRoleState, updateRoleAction] = useFormState(UpdateRoleForm, null)
    const [selectedRole, setSelectedRole] = useState<string | null>(user.admin ? user.admin.role : null)

    useEffect(() => {
        if (updateRoleState?.success) {
            notifications.show({
                title: '역할 수정 완료',
                message: '역할이 성공적으로 수정되었습니다',
            })
            redirect('/admin')
        }
    }, [updateRoleState])

    console.log(selectedRole)

    return (
        <>
        <Text>역할 수정</Text>
            <form action={updateRoleAction}>
                <input type="hidden" name="userId" value={user.userId} />
                <RoleSelector roles={roles} selectedRole={selectedRole} setSelectedRole={setSelectedRole} />


                {
                    selectedRole === 'worker' ? (
                        <NativeSelect
                            name='assignedLockerBuilding'
                            label='실무 관리자의 담당 보관함을 선택하세요'
                            data={
                                lockerBuildingList.map((building) => (
                                    { label: building.buildingName, value: String(building.buildingNumber) }
                                ))
                            }
                        />
                    ) : null
                }
                <SubmitRoleUpdate />
            </form>
        </>
    )
}
