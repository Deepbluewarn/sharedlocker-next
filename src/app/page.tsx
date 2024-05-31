import { cookies } from "next/headers";
import Link from "next/link";
import fetchUserInfo from "../actions/user/userInfo";
import SignOutForm from "@/components/auth/LogoutForm";
import UserGreet from "@/components/user/UserGreet";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

function checkCookie(cookie: RequestCookie | undefined): boolean {
  return cookie?.value !== '';
}
export default async function Home() {
  const cookieStore = cookies()
  const accessToken = cookieStore.get(process.env.ACCESS_TOKEN_COOKIE_NAME!)

  let component = null

  if (checkCookie(accessToken)) {
    const user = await fetchUserInfo();

    component = (
      <>
        <h1>Home</h1>
        <SignOutForm />

        <Link href='/admin'>관리자 페이지</Link>

        <UserGreet userInfo={user.value}/>
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
