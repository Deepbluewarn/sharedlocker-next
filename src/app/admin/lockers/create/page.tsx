import { fetchLockerStructure } from "@/actions/locker/getLockerStructure"
import LockerCreateForm from "@/components/locker/LockerCreateForm"

export default async function AdminLockerCreatePage() {
    const lockerStructure_res = await fetchLockerStructure()
    
    return (
        <>
            <h1>보관함 관리</h1>
            <p>보관함 추가 페이지입니다. 건물과 층을 선택 후 추가하고자 하는 보관함의 번호를 입력하세요. </p>

            <LockerCreateForm lockerStructure={lockerStructure_res.value}/>
        </>
    )
}
