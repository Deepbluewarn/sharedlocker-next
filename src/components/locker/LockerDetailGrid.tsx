import { Paper, Table, Text } from '@mantine/core';
import classes from '@/styles/locker/LockerDetailGrid.module.css';
import { ILockerDetail } from '@/interfaces/api/locker';
import UserInfo from '../user/UserInfo';

export function LockerDetailGrid({ lockerDetails } : { lockerDetails: ILockerDetail[] }) {
    const lockers = lockerDetails.map(locker => {
        return (
            <Paper className={classes.lockerDetail}>
                <Text className={classes.title}>{locker.buildingName} {locker.floorNumber}층 {locker.lockerNumber}번 보관함</Text>
                <Text>보관함 상태: {locker.status}</Text>

                <Paper shadow="xs" radius="xs" withBorder p="xl">
                    <Text className={classes.title}>사용자</Text>
                    {
                        locker.claimedByUser.length === 0 ? (
                            <Text>사용자 없음</Text>
                        ) : (
                            <UserInfo user={locker.claimedByUser[0]} />
                        )
                    }
                </Paper>

                <Paper shadow="xs" radius="xs" withBorder p="xl">
                    <Text className={classes.title}>공유 사용자</Text>
                    {
                        locker.claimedByUser.length === 0 ? (
                            <Text>사용자 없음</Text>
                        ) : (
                            locker.sharedWithUsers.map(user => {
                                return <UserInfo user={user} />
                            })
                        )
                    }
                </Paper>

                <Paper shadow="xs" radius="xs" withBorder p="xl">
                    <Text className={classes.title}>공유 요청 사용자</Text>
                    {
                        locker.shareRequestedUsers.length === 0 ? (
                            <Text>사용자 없음</Text>
                        ) : (
                            locker.shareRequestedUsers.map(user => {
                                return <UserInfo user={user} />
                            })
                        )
                    }
                </Paper>
            </Paper>
        )
    })

    const accessHistory = lockerDetails[0].accessHistory;
    
    return (
        <div className={classes.root}>
            {lockers}

            <Text className={classes.title}>접근 기록</Text>
            <Table>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>아이디</Table.Th>
                        <Table.Th>일시</Table.Th>
                        <Table.Th>종류</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {
                        Array.isArray(accessHistory) && accessHistory.map(history => {
                            return (
                                <Table.Tr>
                                    <Table.Td>{history.userId}</Table.Td>
                                    <Table.Td>{history.accessTime}</Table.Td>
                                    <Table.Td>{history.accessType}</Table.Td>
                                </Table.Tr>
                            )
                        })
                    }
                </Table.Tbody>
            </Table>
        </div>
    );
}