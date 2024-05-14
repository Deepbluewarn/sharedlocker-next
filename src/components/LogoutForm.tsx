'use client'

import { fetchSignOut } from "@/app/actions/signout"
import { useFormState } from "react-dom"

const initialState = {
    message: '',
}

export default function SignOutForm() {
    const [state, formAction] = useFormState(fetchSignOut, initialState)
    
    return (
        <>
            <h1>로그아웃</h1>

            <form action={formAction}>
                <button>로그아웃</button>
            </form>

            <p>{state.message}</p>
        </>
    )
}
