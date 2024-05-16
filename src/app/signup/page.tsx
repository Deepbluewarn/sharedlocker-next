'use client'

import signUp from "../../actions/signUp"
import { useFormState } from "react-dom"

const initialState = {
    message: '',
}

export default function SignUp() {
    const [state, formAction] = useFormState(signUp, initialState)
    
    return (
        <>
            <h1>회원가입</h1>

            <form action={formAction}>
                <input type="text" name='id' placeholder="아이디" />
                <input type="password" name='password' placeholder="비밀번호" />
                <input type="password" name='password_confirm ' placeholder="비밀번호 확인" />
                <input type="text" name='name' placeholder="이름" />
                <input type="text" name='email' placeholder="이메일" />

                <button>회원가입</button>

                <p>{state.message}</p>
            </form>
        </>
    )
}
