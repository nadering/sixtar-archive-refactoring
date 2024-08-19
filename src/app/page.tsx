import {
  Header,
  Footer,
  FullscreenDarkModal,
  BackToTopButton,
} from "@/app/_common";
import HomeInformation from "./_board/home-information";

export default function Home() {
  return (
    <>
      <FullscreenDarkModal />
      <BackToTopButton />
      <div className="flex flex-col w-screen max-w-5xl h-full min-h-screen bg-white mx-auto lg:border-x-2 lg:border-gray-500 lg:shadow-2xl">
        <Header />
        <HomeInformation />
        <Footer />
      </div>
    </>
  );
}
