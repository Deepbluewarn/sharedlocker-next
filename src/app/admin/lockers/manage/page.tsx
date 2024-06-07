import { fetchLockerStructure } from "@/actions/locker/getLockerStructure"
import ManageLocker from "@/components/locker/ManageLocker"
import { Text } from "@mantine/core"

export default async function AdminLockerManagePage() {
    const lockerStructure_res = await fetchLockerStructure()

    const key = lockerStructure_res.value.map((ls) => 
        ls.buildingName + ls.buildingNumber + 
        ls.floorList.join('') + ls.lockerList.map((ll) => ll.floor + ll.list.join('')).join('')
    ).join('')

    return (
        <>
            <Text>보관함 관리</Text>

            <ManageLocker 
                // key={key}
                lockerStructure={lockerStructure_res.value}
            />
        </>
    )
}
