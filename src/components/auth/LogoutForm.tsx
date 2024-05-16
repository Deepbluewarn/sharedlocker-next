'use client'

import signOut, { fetchSignOut } from "@/actions/signout"
import { useFormState } from "react-dom"

const initialState = {
    message: '',
}

export default function SignOutForm() {
    const [state, formAction] = useFormState(signOut, initialState)
    
    return (
        <>
            <form action={formAction}>
                <button>로그아웃</button>
            </form>

            <p>{state.message}</p>
        </>
    )
}
