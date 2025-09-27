import { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import '@fortawesome/fontawesome-free/css/all.min.css';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "刘姥姥 | AI 顾问 & AI BP",
  description: "聚焦 AI 领域，深耕私人 AI 服务与 AI 业务落地场景",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased art-tech-background`}
      >
        {/* 全局艺术科技装饰元素 */}
        <div className="global-decoration abstract-line"></div>
        <div className="global-decoration abstract-dot-pattern"></div>
        {children}
      </body>
    </html>
  );
}
