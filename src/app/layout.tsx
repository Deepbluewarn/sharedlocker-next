import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "스마트 공유 보관함",
  description: "보관함을 함께 공유할 수 있는 서비스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <meta charSet="utf-8" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
