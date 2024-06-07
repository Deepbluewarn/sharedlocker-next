import classes from '@/styles/admin/user-layout.module.css'
import { Text } from '@mantine/core'

export default function UsersLayout({ children } : { children: React.ReactNode }) {
    return (
        <div className={classes.container}>
            <Text size="xl" fw={700}>회원 관리</Text>
            {children}
        </div>
    )
}