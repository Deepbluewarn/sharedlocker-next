import Link from "next/link"

export default async function AdminLockerPage() {
    return (
        <>
            <h1>보관함 관리</h1>

            <Link href='/admin/lockers/manage'>
                보관함 관리
            </Link>

            <Link href='/admin/lockers/create'>
                보관함 추가
            </Link>
        </>
    )
}
