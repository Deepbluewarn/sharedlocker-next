import { cookies } from "next/headers";
import Link from "next/link";
import fetchUserInfo from "./actions/userInfo";
import SignOutForm from "@/components/LogoutForm";

export default async function Home() {
  const cookieStore = cookies()
  const accessToken = cookieStore.get(process.env.ACCESS_TOKEN_COOKIE_NAME!)

  let component = null

  if (typeof accessToken !== 'undefined') {
    component = (
      <>
        <h1>Home</h1>
        <SignOutForm />

        {
          JSON.stringify(await fetchUserInfo())
        }
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
