import { MainHeader } from "@/components/headers/MainHeader";
import { cookies } from "next/headers";
import { FooterCentered } from "@/components/footers/footer";
import fetchUserInfo from "@/actions/user/userInfo";
import { checkAuthToken } from "@/utils";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies()
  const accessToken = cookieStore.get(process.env.ACCESS_TOKEN_COOKIE_NAME!)

  const tokenValidation = checkAuthToken();
  let userInfo;

  if (tokenValidation) {
    userInfo = await fetchUserInfo();
  }

  return (
    <>
      <MainHeader
        token={accessToken?.value || ''}
        userInfo={userInfo?.value}
      />
      {children}
      <FooterCentered />
    </>
  );
}
