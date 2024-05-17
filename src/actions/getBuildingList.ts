export function fetchBuildingList() {
    return fetch(`${process.env.API_BASE_URL}/api/locker/building`, {
        method: 'GET',
    }).then(res => res.json())
}
