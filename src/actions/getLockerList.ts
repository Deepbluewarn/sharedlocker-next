export async function fetchLockerList(buildingNumber: number, floor: number) {
    return fetch(`${process.env.API_BASE_URL}/api/lockers?buildingNumber=${buildingNumber}&floor=${floor}`, {
        method: 'GET',
    }).then(res => res.json())
}
