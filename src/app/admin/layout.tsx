import { Metadata } from "next";
import React from "react";
import {
    IconUsers,
    IconBox,
} from '@tabler/icons-react';
import Link from "next/link";
import { checkAuthToken } from "@/utils";
import { AdminAppShell } from "@/components/appShell/AdminAppShell";
import { fetchAdmin } from "@/actions/admin/getAdmin";

export const metadata: Metadata = {
    title: "스마트 공유 보관함",
    description: "관리자 페이지",
};

const data = [
    { link: '/admin/users', label: '회원 관리', icon: IconUsers },
    { link: '/admin/lockers', label: '보관함 관리', icon: IconBox },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    const tokenValidation = checkAuthToken();

    if (!tokenValidation) {
        return (
            <>
                <h1>관리자 페이지</h1>
                <p>로그인이 필요합니다.</p>
                <Link href='/signin'>로그인</Link>
            </>
        )
    }
    const admin = await fetchAdmin()
    
    if (!admin || !admin.success) {
        return (
            <>
                <h1>관리자 페이지</h1>
                <p>권한이 없습니다.</p>
            </>
        )
    }

    return <AdminAppShell tokenValidation={tokenValidation} >
        {children}
    </AdminAppShell>
}