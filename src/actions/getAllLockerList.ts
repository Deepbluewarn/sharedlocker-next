export async function fetchAllLockerList() {
    return fetch(`${process.env.API_BASE_URL}/api/all-lockers`, {
        method: 'GET',
    }).then(res => res.json())
}
