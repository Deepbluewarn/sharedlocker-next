import styles from '@/styles/admin/searchedUser.module.css';

export interface IUserInfo {
    userId: string,
    nickname: string,
    email: string,
    role: string,
    createdAt: string,
}

export default function UserInfo(props: {user: IUserInfo}) {
    const user = props.user

    return (
        <div className={styles.container}>
            <h3>{user.nickname} ({user.userId})</h3>
            <p>{user.email}</p>
            <p>{user.role}</p>
            <p>{user.createdAt}</p>
        </div>
    )
}