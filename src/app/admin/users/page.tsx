'use client'

import { userListByUserId } from "@/actions/user/userListByUserId"
import UserInfo from "@/components/user/UserInfo"
import Link from "next/link"
import { useFormState } from "react-dom"

export default function AdminUserPage() {
    const [userState, userFormAction] = 
        useFormState(userListByUserId, null)

    const userList = userState?.value

    return (
        <>
            <h1>유저 관리</h1>
            <p>유저 관리 페이지에 오신 것을 환영합니다.</p>
            <form action={userFormAction}>
                <input type='text' name='userId' placeholder='유저 아이디를 검색하세요'/>
                <button type='submit'>검색</button>
            </form>

            <p>회원을 클릭하면 역할을 수정할 수 있습니다.</p>
            {Array.isArray(userList) && userList.map((user, index) => (
                <Link href={`/admin/updaterole/${user.userId}`}>
                    <UserInfo user={user} key={user.userId}/>
                </Link>
            ))}
        </>
    )
}
