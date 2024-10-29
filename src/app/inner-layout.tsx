import { Header, Footer, FullscreenDarkModal, BackToTopButton } from "@common";

export default function InnerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <FullscreenDarkModal />
      <BackToTopButton />
      <div className="flex flex-col w-screen max-w-5xl h-full min-h-screen bg-white mx-auto lg:border-x-[1px] lg:border-gray-800 lg:shadow-2xl">
        <Header />
        <div className="flex flex-col grow justify-center items-center py-2">
          {children}
        </div>
        <Footer />
      </div>
    </>
  );
}
