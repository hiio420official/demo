import type { Metadata } from "next";
import { Inter } from "next/font/google";
import 'antd/dist/reset.css';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TinyMCE 데모",
  description: "TinyMCE 에디터 데모 페이지",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
