'use server'

import FetchWrapper from "../fetch-wrapper"

async function fetchUpdateLockerInfo(formData: FormData) {
    return await FetchWrapper(`${process.env.API_BASE_URL}/api/update-locker`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            buildingNumber: formData.get('buildingNumber'),
            floor: formData.get('floor'),
            lockerNumber: formData.get('lockerNumber'),
        }),
    }).then(res => res.json())
}

export default async function updateLockerInfoAction(prevState: string, formData: FormData) {
    const fetch_res = await fetchUpdateLockerInfo(formData)

    if (!fetch_res.success) {
        return prevState
    }

    prevState = fetch_res.message

    return prevState
}
