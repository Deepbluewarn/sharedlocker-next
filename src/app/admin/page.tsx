// 관리자 페이지 최초 진입 지점.

import { fetchAdmin } from "@/actions/getAdmin";
import Link from "next/link";

export default async function AdminPage() {
    const admin = await fetchAdmin()
    
    if (!admin || !admin.success) {
        return (
            <>
                <h1>관리자 페이지</h1>
                <p>권한이 없습니다.</p>
            </>
        )
    }

    return (
        <>
            <h1>관리자 페이지</h1>
            <p>관리자 페이지에 오신 것을 환영합니다.</p>
            <Link href='/admin/users'>유저 관리</Link>
            <Link href='/admin/lockers'>보관함 관리</Link>
        </>
    )
}