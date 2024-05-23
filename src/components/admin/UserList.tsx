import { fetchUserListByUserId } from "@/actions/user/userListByUserId"
import UserInfo from "../user/UserInfo"

export default async function UserListByUserId({ userId } : {userId: string}) {
    let userListComponent = null

    const userList_res = await fetchUserListByUserId(userId)
    const userList = userList_res.message

    if (!Array.isArray(userList)) {
        userListComponent = <p>유저 검색에 실패했습니다.</p>
    } else {
        if (userList.length > 0) {
            userListComponent = userList.map((user, index) => {
                return (
                    <UserInfo
                        key={user.userId}
                        user={user}
                    />
                )
            })
        } else {
            userListComponent = <p>검색 결과가 없습니다.</p>
        }
    }

    return (
        {userListComponent}
    )
}
