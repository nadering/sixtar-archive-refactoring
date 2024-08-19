import type { Metadata } from "next";
// import { IBM_Plex_Sans_KR, IBM_Plex_Sans_JP } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sixtar-Archive",
  description: "Sixtar-Archive ver_2.0.0",
};

/*
const IbmPlexSansKR = IBM_Plex_Sans_KR({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

const IbmPlexSansJP = IBM_Plex_Sans_JP({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});
*/

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
