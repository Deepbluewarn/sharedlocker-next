'use client'

import { useEffect } from "react"
import signIn from "../../actions/auth/signIn"
import { useFormState } from "react-dom"
import { useRouter } from "next/navigation"

export default function SignUp() {
    const [state, formAction] = useFormState(signIn, null)
    const router = useRouter();

    useEffect(() => {
        if (state) {
            alert(state.message)
            if (state.success) {
                router.push('/')
            }
        }
    }, [state])
    
    return (
        <>
            <h1>로그인</h1>

            <form action={formAction}>
                <input type="text" name='id' placeholder="아이디" />
                <input type="password" name='password' placeholder="비밀번호" />
                <button>로그인</button>
            </form>
        </>
    )
}
