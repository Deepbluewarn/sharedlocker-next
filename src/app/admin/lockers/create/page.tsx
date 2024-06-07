import { fetchLockerStructure } from "@/actions/locker/getLockerStructure"
import LockerCreateForm from "@/components/locker/LockerCreateForm"

export default async function AdminLockerCreatePage() {
    const lockerStructure_res = await fetchLockerStructure()
    
    return (
        <>
            <LockerCreateForm lockerStructure={lockerStructure_res.value}/>
        </>
    )
}
