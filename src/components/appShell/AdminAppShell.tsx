'use client'

import { AppShell, AppShellHeader, AppShellMain, AppShellNavbar, Burger, Button, Group, NavLink, Text } from "@mantine/core";
import React from "react";
import classes from '@/styles/admin/NavbarSimpleColored.module.css';
import {
    IconUsers,
    IconBox,
    IconLogout,
    IconLogin,
} from '@tabler/icons-react';
import Link from "next/link";
import SignOutForm from "@/components/auth/LogoutForm";
import { useDisclosure } from "@mantine/hooks";

const data = [
    { link: '/admin/users', label: '회원', icon: IconUsers },
    { link: '/admin/lockers', label: '보관함', icon: IconBox },
];

export function AdminAppShell({ children, tokenValidation }: { children: React.ReactNode, tokenValidation: boolean }) {
    const [opened, { toggle }] = useDisclosure();
    
    const links = data.map((item) => (
        <Link
            className={classes.link}
            href={item.link}
            key={item.label}
        >
            <item.icon className={classes.linkIcon} stroke={1.5} />
            <span>{item.label}</span>
        </Link>
    ));

    return (
        <AppShell
            header={{
                height: 60,
            }}
            navbar={{
                width: 300,
                breakpoint: 'sm',
                collapsed: { mobile: !opened }
            }}
            padding="md"
        >
            <AppShellHeader className={classes.header}>
                <Group>
                    <Burger opened={opened} onClick={toggle} />
                    <Text>공유 보관함</Text>
                </Group>
            </AppShellHeader>
            <AppShellNavbar className={classes.navbar} p="md">
                <div className={classes.navbarMain}>
                    <NavLink
                        component={Link} 
                        href="#required-for-focus"
                        label="회원"
                        leftSection={<IconUsers size="1rem" stroke={1.5} />}
                        childrenOffset={28}
                    >
                        <NavLink component={Link} href="/admin/users" label="회원 관리" />
                    </NavLink>

                    <NavLink
                        component={Link}
                        href="#required-for-focus"
                        label="보관함"
                        leftSection={<IconBox size="1rem" stroke={1.5} />}
                        childrenOffset={28}
                    >
                        <NavLink component={Link} label="보관함 관리" href="/admin/lockers/manage" />
                        <NavLink component={Link} label="보관함 추가" href="/admin/lockers/create" />
                    </NavLink>
                </div>

                <div className={classes.footer}>
                    {
                        tokenValidation ? (
                            <SignOutForm>
                                <Button type="submit">
                                    <IconLogout className={classes.linkIcon} stroke={1.5} />
                                    <span>로그아웃</span>
                                </Button>
                            </SignOutForm>
                        ) : (
                            <a href="/signin" className={classes.link}>
                                <IconLogin className={classes.linkIcon} stroke={1.5} />
                                <span>로그인</span>
                            </a>
                        )
                    }
                </div>
            </AppShellNavbar>
            <AppShellMain>
                {children}
            </AppShellMain>
        </AppShell>
    )
}