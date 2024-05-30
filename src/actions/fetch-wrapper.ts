export default async function FetchWrapper(url: string, options: RequestInit) {
    try {
        const res = await fetch(url, options)

        if(res.status < 500) {
            return res // 사용자가 원하는 형태로 변환하지 않고 그대로 반환
        } else {
            const error_res = await res.json()

            throw new Error(error_res.message)
        }
    } catch (error) {
        throw error
    }
}
