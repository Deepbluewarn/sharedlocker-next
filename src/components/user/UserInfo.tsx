import { IUserInfo } from '@/interfaces/api/user';
import classes from '@/styles/user/userInfo.module.css';
import { Avatar, Group, Text } from '@mantine/core';
import { IconAt, IconCalendarDue } from '@tabler/icons-react';

export default function UserInfo(props: { user: IUserInfo }) {
    const user = props.user

    if (!user) {
        return null
    }

    return (
        <div>
            <Group wrap="nowrap">
                <Avatar
                    size={94}
                    radius="md"
                />
                <div>
                    <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
                        {user.admin?.role}
                    </Text>

                    <Text fz="lg" fw={500} className={classes.name}>
                        {user.nickname}
                    </Text>

                    <Group wrap="nowrap" gap={10} mt={3}>
                        <IconAt stroke={1.5} size="1rem" className={classes.icon} />
                        <Text fz="xs" c="dimmed">
                            {user.email}
                        </Text>
                    </Group>

                    <Group wrap="nowrap" gap={10} mt={5}>
                        <IconCalendarDue stroke={1.5} size="1rem" className={classes.icon} />
                        <Text fz="xs" c="dimmed">
                            {user.createdAt}
                        </Text>
                    </Group>
                </div>
            </Group>
        </div>
    )
}