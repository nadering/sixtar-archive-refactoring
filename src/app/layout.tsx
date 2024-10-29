import type { Metadata } from "next";
import { Providers } from "./providers";
import InnerLayout from "./inner-layout";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sixtar-Archive",
  description:
    "리듬 게임 Sixtar Gate: STARTRAIL의 서열표 기능을 제공하는 사이트입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body suppressHydrationWarning>
        <Providers>
          <InnerLayout>{children}</InnerLayout>
        </Providers>
      </body>
    </html>
  );
}
