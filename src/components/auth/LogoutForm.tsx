'use client'

import signOut from "@/actions/auth/signout"
import { useFormState } from "react-dom"

export default function SignOutForm() {
    const [state, formAction] = useFormState(signOut, null)
    
    return (
        <>
            <form action={formAction}>
                <button>로그아웃</button>
            </form>
        </>
    )
}
