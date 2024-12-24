'use client'

import deleteUser from "@/actions/auth/deleteUser";
import { IUserInfo } from "@/interfaces/api/user";
import { Button, Stack } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";

const SubmitRoleUpdate = () => {
    const { pending } = useFormStatus()

    return (
        <Button type='submit' disabled={pending} color="red">
            {pending ? '삭제 중...' : '회원 삭제'}
        </Button>
    )
}
export default function DeleteUser(props: { user: IUserInfo }) {
    const [state, formAction] = useFormState(deleteUser, null)
    const router = useRouter()

    useEffect(() => {
        if (state?.message) {
            alert(state?.message)
        }
        if (state?.success) {
            router.push('/admin/users')
        }
    }, [state])

    return (
        <form action={formAction}>
            <input type="hidden" name="userId" value={props.user.userId} />
            <Stack align="flex-end">
                <SubmitRoleUpdate />
            </Stack>
        </form>
    )
}
