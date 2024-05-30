import { ILockerDetail } from "@/interfaces/api/locker"

export default function LockerDetail({
    lockerDetail
}: {
    lockerDetail: ILockerDetail[]
}) {
    const claimedByUser = lockerDetail[0].claimedByUser;
    const sharedUser = lockerDetail[0].sharedWithUsers;
    const shareRequestList = lockerDetail[0].shareRequestedUsers;

    const lockerDescription = `${lockerDetail[0].buildingName} (${lockerDetail[0].buildingNumber}번) ${lockerDetail[0].floorNumber}층 ${lockerDetail[0].lockerNumber}번 보관함`
    const claimedUserDescription = claimedByUser.length > 0 ? `보관함을 사용중인 사용자: ${claimedByUser[0].nickname} (${claimedByUser[0].userId})` : '보관함을 사용중인 사용자가 없습니다.'
    const sharedUserDescription = sharedUser.map(s => {
        return (<p>
            {s.nickname} ({s.userId})
        </p>)
    })
    const shareRequestListDescription = shareRequestList.map(s => {
        return (<p>
            {s.nickname} ({s.userId})
        </p>)
    })

    return (
        <div>
            <h1>보관함 세부사항</h1>
            {
                Array.isArray(lockerDetail) && lockerDetail.length > 0 ? (
                    <>
                        <p>{lockerDescription}</p>
                        <p>{claimedUserDescription}</p>
                        {
                            sharedUser.length > 0 ? (
                                <>
                                    <p>보관함을 공유중인 사용자: </p>
                                    {sharedUserDescription}
                                </>
                            ) : null
                        }
                        {
                            shareRequestList.length > 0 ? (
                                <>
                                    <p>보관함에 공유를 신청한 사용자: </p>
                                    {shareRequestListDescription}
                                </>
                            ) : null
                        }
                    </>
                ) : (
                    <p>보관함을 선택해주세요.</p>
                )
            }

        </div>
    )
}
