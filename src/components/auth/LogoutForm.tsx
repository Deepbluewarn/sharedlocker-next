'use client'

import signOut from "@/actions/auth/signout"
import { Button } from "@mantine/core"
import { useEffect } from "react"
import { useFormState } from "react-dom"

export default function SignOutForm({ children } : { children?: React.ReactNode}) {
    const [state, formAction] = useFormState(signOut, null)
    
    return (
        <>
            <form action={formAction}>
                {
                    children ? (
                        children
                    ) : (
                        <Button type='submit' variant="default">로그아웃</Button>
                    )
                }
            </form>
        </>
    )
}
