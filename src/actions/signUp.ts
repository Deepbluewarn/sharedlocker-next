'use server'

import { redirect } from "next/navigation"

async function fetchSignUp(formData: FormData) {
    return await fetch(`${process.env.API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: formData.get('id'),
            password: formData.get('password'),
            nickname: formData.get('name'),
            email: formData.get('email'),
        }),
    }).then((res) => res.json())
}

export default async function signUp(prevState: any, formData: FormData) {
    let response = null
    let message = ''

    try {
        response = await fetchSignUp(formData)
    } catch (error) {
        message = '서버 에러'
    }

    if (response.success) {
        redirect('/')
    } else {
        message = response.message
    }

    return { message }
}
