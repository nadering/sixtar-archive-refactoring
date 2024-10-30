import { Header, Footer, FullscreenDarkModal, BackToTopButton } from "@common";
import { Main } from "@board";

export default function Home() {
  return (
    <>
      <FullscreenDarkModal />
      <BackToTopButton />
      <div className="flex flex-col w-screen max-w-5xl h-full min-h-screen bg-white mx-auto lg:border-x-[1px] lg:border-gray-800 lg:shadow-2xl">
        <Header />
        <Main />
        <Footer />
      </div>
    </>
  );
}
