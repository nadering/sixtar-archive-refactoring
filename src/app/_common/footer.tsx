export default function Footer() {
  return (
    <footer className="flex flex-col w-full bg-gray-100 border-t-2 border-gray-500 mt-2 px-5 py-4 gap-y-3">
      <p className="text-black text-base font-normal">
        본 사이트는 게임{" "}
        <a
          className="font-semibold underline underline-offset-2"
          href="https://store.steampowered.com/app/1802720/Sixtar_Gate_STARTRAIL/"
          target="_blank"
          rel="noopener noreferrer"
        >
          식스타 게이트: 스타트레일
        </a>
        의 팬 사이트이며, <br className="hidden sm:inline" />
        사이트 내 사용된 모든 게임 컨텐츠의 저작권은{" "}
        <span className="font-semibold">STARLIKE Inc.</span>에 있습니다.
      </p>
      <div className="flex flex-col items-start gap-x-0 text-black text-base font-normal sm:flex-row sm:gap-x-2">
        <a
          className="hover:font-semibold"
          href="https://forms.gle/qJMFagZ5VHmGYMZR9"
          target="_blank"
          rel="noopener noreferrer"
        >
          층수 조정 요청
        </a>
        <span className="hidden sm:inline">|</span>
        <a
          className="hover:font-semibold"
          href="https://forms.gle/HyzQqfuoPodimTZR9"
          target="_blank"
          rel="noopener noreferrer"
        >
          사이트 개선사항 요청
        </a>
      </div>
      <p className="text-black text-base font-normal">
        Special Thanks to{" "}
        <a
          className="font-semibold underline underline-offset-2"
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
