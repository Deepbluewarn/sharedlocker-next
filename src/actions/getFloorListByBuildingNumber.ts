export async function fetchFloorListByBuildingNumber(buildingNumber: number) {
    return fetch(`${process.env.API_BASE_URL}/api/locker/floor?buildingNumber=${buildingNumber}`, {
        method: 'GET',
    }).then(res => res.json())
}
