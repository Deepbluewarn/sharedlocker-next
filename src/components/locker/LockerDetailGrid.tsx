import { Paper, SimpleGrid, Text } from '@mantine/core';
import classes from '@/styles/locker/LockerDetailGrid.module.css';
import { ILockerDetail } from '@/interfaces/api/locker';
import UserInfo from '../user/UserInfo';

export function LockerDetailGrid({ lockerDetails } : { lockerDetails: ILockerDetail[] }) {
    const lockers = lockerDetails.map(locker => {
        return (
            <Paper>
                <Text>{locker.buildingName} {locker.floorNumber}층 {locker.lockerNumber}번 보관함</Text>
                <Text>보관함 상태: {locker.status}</Text>
                <Text>사용자</Text>
                <UserInfo user={locker.claimedByUser[0]} />
                <Text>공유 사용자</Text>
                {locker.sharedWithUsers.map(user => {
                    return <UserInfo user={user} />
                })}
                <Text>공유 요청 사용자</Text>
                {locker.shareRequestedUsers.map(user => {
                    return <UserInfo user={user} />
                })}
            </Paper>
        )
    })
    
    return (
        <div className={classes.root}>
            {lockers}
        </div>
    );
}