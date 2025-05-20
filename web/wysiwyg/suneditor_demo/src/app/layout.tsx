import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ConfigProvider } from 'antd';
import koKR from 'antd/locale/ko_KR';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SUNEDITOR 데모",
  description: "SUNEDITOR React 데모 페이지",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <ConfigProvider
          locale={koKR}
          theme={{
            token: {
              colorPrimary: '#1677ff',
            },
          }}
        >
          {children}
        </ConfigProvider>
      </body>
    </html>
  );
}
