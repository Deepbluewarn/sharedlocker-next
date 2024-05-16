import styles from '@/styles/user/userInfo.module.css'
import { IUserInfo } from './UserInfo'

export default function UserGreet(props: {userInfo: IUserInfo}) {
    const userInfo = props.userInfo
    
    return (
        <div className={styles.container}>
            <h3>{userInfo.nickname} ({userInfo.userId})님 안녕하세요!</h3>
        </div>
    )
}