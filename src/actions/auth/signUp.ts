'use server'

import { redirect } from "next/navigation"
import FetchWrapper from "../fetch-wrapper"
import IApiResponse from "@/interfaces/api"

async function fetchSignUp(formData: FormData): Promise<IApiResponse<string, null>> {
    return await FetchWrapper(`${process.env.API_BASE_URL}/auth/register`, {
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
    let message = ''

    try {
        const response = await fetchSignUp(formData)

        if (response.success) {
            message = response.message
        }
    } catch (error) {
        message = '서버 에러'
    }

    redirect('/')

    return { message }
}
