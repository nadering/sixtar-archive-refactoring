import {
  Header,
  Footer,
  FullscreenDarkModal,
  BackToTopButton,
} from "@/app/_common";
import MainBoard from "./_board/main-board";

export default function Home() {
  return (
    <>
      <FullscreenDarkModal />
      <BackToTopButton />
      <div className="flex flex-col w-screen max-w-5xl h-full min-h-screen bg-white mx-auto lg:border-x-2 lg:border-gray-500 lg:shadow-2xl">
        <Header />
        <MainBoard />
        <Footer />
      </div>
    </>
  );
}
