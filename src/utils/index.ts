import { cookies } from "next/headers";

export function checkAuthToken(): boolean {
    const cookieStore = cookies()
    const accessToken = cookieStore.get(process.env.ACCESS_TOKEN_COOKIE_NAME!)
  
    if (typeof accessToken === 'undefined') return false;
    if (accessToken && accessToken.value === '') return false;

    return true;
}
