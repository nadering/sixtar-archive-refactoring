import Image from "next/image";
import MainLogo from "@logo/main.webp";

export default function Header() {
  return (
    <header className="flex px-1">
      {/* Filter: solar-200 > hover:solar-400 */}
      <Image
        className="aspect-square cursor-pointer select-none duration-200
        [filter:invert(83%)_sepia(9%)_saturate(908%)_hue-rotate(298deg)_brightness(101%)_contrast(102%)]
        hover:[filter:invert(65%)_sepia(28%)_saturate(1675%)_hue-rotate(301deg)_brightness(103%)_contrast(99%)]"
        src={MainLogo}
        alt="main-logo"
        width={70}
      />
    </header>
  );
}
