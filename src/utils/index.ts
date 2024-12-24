import { LockerStatus } from "@/interfaces/api/locker";

export async function checkAuthToken(): Promise<boolean> {
    const { cookies } = await import("next/headers");
    const cookieStore = cookies()
    const accessToken = cookieStore.get(process.env.ACCESS_TOKEN_COOKIE_NAME!)
  
    if (typeof accessToken === 'undefined') return false;
    if (accessToken && accessToken.value === '') return false;

    return true;
}

export function lockerStatusMapper(status: LockerStatus) {
    let res = '';

    switch(status) {
        case 'Empty':
            res = '비어있음'
            break;
        case "Share_Available":
            res = '공유 가능'
            break;
        case "Unavailable":
            res = '사용 불가'
            break;
        case "Maintenance":
            res = '점검 중'
            break;
    }

    return res;
}