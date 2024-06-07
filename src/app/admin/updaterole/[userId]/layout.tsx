import classes from '@/styles/admin/user-layout.module.css'
import { Text } from '@mantine/core'

export default function UserDetailLayout({ children } : { children: React.ReactNode }) {
    return (
        <div className={classes.container}>
            <Text size="xl" fw={700}>회원 상세</Text>
            {children}
        </div>
    )
}