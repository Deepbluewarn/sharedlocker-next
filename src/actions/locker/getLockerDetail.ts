export async function fetchLockerDetail(buildingNumber: number, floor: number, lockerNumber: number) {
    return await fetch(
        `${process.env.API_BASE_URL}/api/locker?buildingNumber=${buildingNumber}&floor=${floor}&lockerNumber=${lockerNumber}`, 
    {
        method: 'GET',
        cache: 'no-store'
    }).then(res => res.json())
}
