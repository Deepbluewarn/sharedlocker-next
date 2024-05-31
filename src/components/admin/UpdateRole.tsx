'use client'

import { IUserInfo } from "@/interfaces/api/user";
import { IRole } from '@/interfaces/api/admin';
import RoleSelector from '../auth/RoleSelector';
import { useEffect, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import UpdateRoleForm from '@/actions/user/updateRole';
import { IBuildingInfo } from "@/interfaces/api/locker";
import { redirect } from "next/navigation";

const SubmitRoleUpdate = () => {
    const { pending } = useFormStatus()

    return (
        <button disabled={pending}>
            {pending ? '저장 중...' : '저장'}
        </button>
    )
}
export default function UpdateRole({roles, user, lockerBuildingList} : {
    roles: IRole[],
    user: IUserInfo,
    lockerBuildingList: IBuildingInfo[]
}) {
    // 역할을 수정하는 form 구현
    const [updateRoleState, updateRoleAction] = useFormState(UpdateRoleForm, null)
    const [selectedRole, setSelectedRole] = useState(user.role)

    useEffect(() => {
        if (updateRoleState?.success) {
            alert(updateRoleState?.message)
            redirect('/admin')
        }
    }, [updateRoleState])

    return (
        <>
            <form action={updateRoleAction}>
                <input type="hidden" name="userId" value={user.userId} />
                <RoleSelector roles={roles} selectedRole={selectedRole} setSelectedRole={setSelectedRole} />

                {
                    selectedRole === 'worker' ? (
                        <fieldset>
                            <legend>담당 보관함</legend>
                            <select name="assignedLockerBuilding">
                                <optgroup>
                                    {
                                        lockerBuildingList.map((building) => (
                                            <option key={building.buildingNumber} value={building.buildingNumber}>{building.buildingName}</option>
                                        ))
                                    }
                                </optgroup>
                            </select>

                        </fieldset>
                    ) : null
                }
                <SubmitRoleUpdate />
            </form>
        </>
    )
}
