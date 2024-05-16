'use client'

import UserListByNickname from "@/actions/userListByNickname";
import { useFormState, useFormStatus } from "react-dom";
import styles from '@/styles/admin/giveAdmin.module.css'
import UserInfo, { IUserInfo } from "../user/UserInfo";
import { IRole } from "@/actions/roleList";
import RoleSelector from "../auth/RoleSelector";
import UpdateRoleForm from "@/actions/updateRole";
import { useEffect, useState } from "react";
import Link from "next/link";

const initialState = {
    userList: [] as IUserInfo[]
}

function SearchFormButton() {
    const { pending } = useFormStatus()

    return (
        <button type='submit' disabled={pending}>{pending ? "로딩 중.." : '유저 검색'}</button>
    )
}

export default function UpdateRole({roles} : {roles: IRole[]}) {
    const [state, formAction] = useFormState(UserListByNickname, initialState)
    const [updateRoleState, updateRoleAction] = useFormState(UpdateRoleForm, '')

    let userListComponent = null

    if (!Array.isArray(state.userList)) {
        userListComponent = <p>유저 검색에 실패했습니다.</p>
    } else {
        if (state.userList.length > 0) {
            userListComponent = state.userList.map((user, index) => {
                return (
                    <Link 
                        href={`/admin/updaterole/${user.userId}`} 
                        key={user.userId}
                    >
                        <div className={styles.user}>
                        <UserInfo
                            key={user.userId}
                            user={user}
                        />
                    </div>
                    </Link>
                    
                )
            })
        } else {
            userListComponent = <p>검색 결과가 없습니다.</p>
        }
    }

    return (
        <div className={styles.container}>
            <h1>관리자 등록</h1>

            <form action={formAction}>
                <input type="text" name='nickname' placeholder="닉네임" />
                <SearchFormButton />
            </form>
            {updateRoleState}
            {userListComponent}
        </div>
    )
}
