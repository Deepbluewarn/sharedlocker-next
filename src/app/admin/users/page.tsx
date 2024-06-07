'use client'

import { userListByUserId } from "@/actions/user/userListByUserId"
import Link from "next/link"
import { Button, Divider, Table, TextInput } from "@mantine/core";
import { useFormState } from "react-dom"
import classes from '@/styles/admin/user.module.css'

export default function AdminUserPage() {
    const [userState, userFormAction] = 
        useFormState(userListByUserId, null)

    const userList = userState?.value

    return (
        <>
            <form action={userFormAction} className={classes.userSearchForm}>
                <TextInput
                    label="회원 검색"
                    description="회원 아이디를 입력하세요"
                    placeholder="회원 아이디"
                    name='userId'
                />
                <Button type='submit'>검색</Button>
            </form>

            <Divider />

            <Table>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>아이디</Table.Th>
                        <Table.Th>이름</Table.Th>
                        <Table.Th>이메일</Table.Th>
                        <Table.Th>역할</Table.Th>
                        <Table.Th />
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {Array.isArray(userList) && userList.length > 0 ? (
                        userList.map(user => (
                            <Table.Tr key={user.userId}>
                                <Table.Td>{user.userId}</Table.Td>
                                <Table.Td>{user.nickname}</Table.Td>
                                <Table.Td>{user.email}</Table.Td>
                                <Table.Td>{user.admin.role}</Table.Td>
                                <Table.Td>
                                    <Link href={`/admin/updaterole/${user.userId}`}>
                                        회원 상세
                                    </Link>
                                </Table.Td>
                            </Table.Tr>
                        ))
                    ) : (
                        <Table.Tr>
                            <Table.Td colSpan={4}>
                                검색 결과가 없습니다.
                            </Table.Td>
                        </Table.Tr>
                    )}
                </Table.Tbody>
            </Table>
        </>
    )
}
