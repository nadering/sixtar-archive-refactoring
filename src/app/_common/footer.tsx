export default function Footer() {
  return (
    <footer
      className="flex flex-col w-full bg-gray-100 border-t-2 border-gray-500 mt-2 px-5 py-4 gap-y-3"
    >
      <p className="text-black text-base font-normal">
        본 사이트는 게임{" "}
        <span className="font-semibold">"식스타 게이트: 스타트레일"</span>의 팬
        사이트이며,
        <br />
        사이트 내 사용된 모든 게임 컨텐츠의 저작권은{" "}
        <span className="font-semibold">Lyrebird Studio</span>에 있습니다.
      </p>
      <p className="text-black text-base font-normal">
        Special Thanks to{" "}
        <a
          className="font-semibold underline"
          href="https://x.com/suisou610"
          target="_blank"
          rel="noopener noreferrer"
        >
          수조
        </a>
      </p>
    </footer>
  );
}
