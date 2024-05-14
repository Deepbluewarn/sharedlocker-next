'use server'

import cookie from 'cookie'
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

async function fetchSignIn(formData: FormData) {
    const cookieStore = cookies()
    
    return await fetch(`${process.env.API_BASE_URL}/auth/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: formData.get('id'),
            password: formData.get('password'),
        }),
        cache: 'no-cache',
    }).then((res) => {
        console.log(res.headers.getSetCookie())

        const cookies = res.headers.getSetCookie()

        cookies.forEach(c => {
            const parsedCookie = cookie.parse(c);
            const [firstPair, ...rest] = c.split('; ');
            const [key, value] = firstPair.split('=');
            
            cookieStore.set(key, value, parsedCookie);
        })

        return res.json()
    })
}

export default async function signIn(prevState: any, formData: FormData) {
    let response = null
    let message = ''

    try {
        response = await fetchSignIn(formData)
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