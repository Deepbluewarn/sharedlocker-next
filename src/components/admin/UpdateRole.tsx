'use client'

import { IUserInfo } from "../user/UserInfo";
import { IRole } from "@/actions/roleList";
import RoleSelector from '../auth/RoleSelector';
import { useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import UpdateRoleForm from '@/actions/updateRole';

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
    lockerBuildingList: string[]
}) {
    // 역할을 수정하는 form 구현
    const [updateRoleState, updateRoleAction] = useFormState(UpdateRoleForm, '')
    const [selectedRole, setSelectedRole] = useState(user.role)

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
                                            <option key={building} value={building}>{building}</option>
                                        ))
                                    }
                                </optgroup>
                            </select>

                        </fieldset>
                    ) : null
                }
                {updateRoleState}
                <SubmitRoleUpdate />
            </form>
        </>
    )
}
