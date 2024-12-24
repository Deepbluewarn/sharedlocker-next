import { ColorSchemeScript, DEFAULT_THEME, MantineProvider, Popover, PopoverDropdown, PopoverTarget, Text } from "@mantine/core";
import type { Metadata } from "next";
import localFont from "next/font/local";
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { cookies } from "next/headers";
import fetchUserInfo from "@/actions/user/userInfo";
import { checkAuthToken } from "@/utils";
import { Notifications } from "@mantine/notifications";

const myFont = localFont({ src: '../styles/fonts/PretendardVariable.woff2' })

export const metadata: Metadata = {
  title: "스마트 공유 보관함",
  description: "보관함을 함께 공유할 수 있는 서비스",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const tokenValidation = await checkAuthToken();
  let userInfo;

  if (tokenValidation) {
    userInfo = await fetchUserInfo();
  }

  return (
    <html lang="ko">
      <head>
        <ColorSchemeScript />
        <meta charSet="utf-8" />
        <link rel="stylesheet" crossOrigin="anonymous" type="text/css"
    href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/variable/pretendardvariable.css" />
      </head>
      <body className={myFont.className}>
        <MantineProvider
          defaultColorScheme="dark"
          theme={{
            fontFamily: 'Roboto, sans-serif',
        fontFamilyMonospace: 'Monaco, Courier, monospace',
        headings: {
          // Use default theme if you want to provide default Mantine fonts as a fallback
          fontFamily: `Roboto, ${DEFAULT_THEME.fontFamily}`,
        },
          }}
        >
          <Notifications />
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
