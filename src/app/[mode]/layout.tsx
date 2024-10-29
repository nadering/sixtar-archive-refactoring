import Image from "next/image";
import SolarLogo from "@logo/solar.webp";
import LunarLogo from "@logo/lunar.webp";

export type variantKey = "solar" | "lunar";

// 모드 레이아웃
export default function ModeLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: {
    mode: string;
  };
}>) {
  // 이미지 색상 필터
  const filterVariants = {
    // solar-400
    solar:
      "[filter:invert(65%)_sepia(28%)_saturate(1675%)_hue-rotate(301deg)_brightness(103%)_contrast(99%)]",
    // lunar-800
    lunar:
      "[filter:invert(22%)_sepia(39%)_saturate(1507%)_hue-rotate(209deg)_brightness(91%)_contrast(85%)]",
  };

  // 텍스트 색상
  const colorVariants = {
    solar: "text-solar",
    lunar: "text-lunar",
  };

  return (
    <div className="flex flex-col grow justify-start items-stretch w-full px-1">
      <div className="flex gap-x-1">
        <Image
          className={`w-9 h-9 select-none ${filterVariants[params.mode as variantKey]}`}
          src={params.mode == "solar" ? SolarLogo : LunarLogo}
          alt="mode-logo"
          height={36}
          priority
        />
        <p
          className={`text-3xl text-center font-semibold ${
            colorVariants[params.mode as variantKey]
          }`}
        >
          {params.mode.toUpperCase()}
        </p>
      </div>
      {children}
    </div>
  );
}
