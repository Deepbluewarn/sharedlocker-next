import { cookies } from "next/headers";
import Link from "next/link";
import fetchUserInfo from "../actions/user/userInfo";
import SignOutForm from "@/components/auth/LogoutForm";
import UserGreet from "@/components/user/UserGreet";

export default async function Home() {
  const cookieStore = cookies()
  const accessToken = cookieStore.get(process.env.ACCESS_TOKEN_COOKIE_NAME!)

  let component = null

  if (typeof accessToken !== 'undefined') {
    const user = await fetchUserInfo();

    component = (
      <>
        <h1>Home</h1>
        <SignOutForm />

        <Link href='/admin'>관리자 페이지</Link>

        <UserGreet userInfo={user.message}/>
      </>
    )
  } else {
    component = (
      <>
        <h1>Home</h1>
        <Link href='/signin'>로그인</Link>
        <Link href='/signup'>회원가입</Link>
      </>
    )
  }

  return component
}
