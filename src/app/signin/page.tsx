'use client'

import signIn from "../../actions/auth/signIn"
import { useFormState } from "react-dom"

export default function SignIn() {
    const [state, formAction] = useFormState(signIn, null)
    
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
