import classes from '@/styles/admin/user-layout.module.css'
import { Text } from '@mantine/core'

export default function LockersLayout({ children } : { children: React.ReactNode }) {
    return (
        <div className={classes.container}>
            <Text size="xl" fw={700}>보관함</Text>
            {children}
        </div>
    )
}