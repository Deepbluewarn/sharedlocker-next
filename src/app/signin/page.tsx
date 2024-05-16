'use client'

import signIn from "../../actions/signIn"
import { useFormState } from "react-dom"

const initialState = {
    message: '',
}

export default function SignUp() {
    const [state, formAction] = useFormState(signIn, initialState)
    
    return (
        <>
            <h1>로그인</h1>

            <form action={formAction}>
                <input type="text" name='id' placeholder="아이디" />
                <input type="password" name='password' placeholder="비밀번호" />
                <button>로그인</button>
            </form>

            <p>{state.message}</p>
        </>
    )
}
