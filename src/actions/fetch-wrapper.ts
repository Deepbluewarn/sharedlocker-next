export default async function FetchWrapper(url: string, options: RequestInit): Promise<Response> {
    const res = await fetch(url, options)

    if (!res.ok) {
        const error_res = await res.json()
        let error = new Error(error_res.message);

        (error as any).digest = error_res.message

        if (res.status >= 400) {
            throw error
        }
    }

    return res;
}
