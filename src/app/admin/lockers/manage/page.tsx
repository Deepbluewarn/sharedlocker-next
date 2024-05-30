import { fetchLockerStructure } from "@/actions/locker/getLockerStructure"
import ManageLocker from "@/components/locker/ManageLocker"

export default async function AdminLockerManagePage() {
    const lockerStructure_res = await fetchLockerStructure()

    if (!lockerStructure_res.success) {
        return (
            <>
                <h1>보관함 관리</h1>
                <p>보관함 정보를 불러오는 중 오류가 발생했습니다.</p>
            </>
        )
    }

    const key = lockerStructure_res.value.map((ls) => 
        ls.buildingName + ls.buildingNumber + 
        ls.floorList.join('') + ls.lockerList.map((ll) => ll.floor + ll.list.join('')).join('')
    ).join('')

    return (
        <>
            <h1>보관함 관리</h1>
            <p>보관함 관리 페이지입니다.</p>

            <ManageLocker 
                // key={key}
                lockerStructure={lockerStructure_res.value}
            />
        </>
    )
}
