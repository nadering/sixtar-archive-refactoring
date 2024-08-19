"use client";

import { useAtom } from "jotai";
import { isModeSolarAtom } from "@/store";
import Image from "next/image";
import SolarLogo from "@logo/solar.webp";
import LunarLogo from "@logo/lunar.webp";
import DataDifficultyNumber from "./data-difficulty-number";

export default function DataSetting() {
  // 현재 모드
  const [isModeSolar, setIsModeSolar] = useAtom(isModeSolarAtom);

  // 모드 변경
  const handleModeChange = () => {
    setIsModeSolar((prev) => !prev);
  };

  // 모드에 따른 필터 적용값
  const filterVariants = {
    // solar-400
    solar:
      "[filter:invert(65%)_sepia(28%)_saturate(1675%)_hue-rotate(301deg)_brightness(103%)_contrast(99%)]",
    // lunar-800
    lunar:
      "[filter:invert(22%)_sepia(39%)_saturate(1507%)_hue-rotate(209deg)_brightness(91%)_contrast(85%)]",
  };

  return (
    <div className="flex flex-col items-center bg-white border-2 border-solar rounded-2xl px-4 py-2 gap-y-1 select-none">
      <div className="flex flex-col items-center">
        <p className="text-solar text-3xl text-center font-bold">MODE</p>
        <Image
          className={`mt-[-12px] cursor-pointer [transition:filter_0s,transform_.15s]
            ${
              isModeSolar ? filterVariants["solar"] : filterVariants["lunar"]
            } hover:scale-110`}
          src={isModeSolar ? SolarLogo : LunarLogo}
          alt="mode-logo"
          width={120}
          onClick={handleModeChange}
        />
      </div>
      <div className="flex flex-col items-center">
        <p className="text-solar text-3xl text-center font-bold">DIFFICULTY</p>
        <div className="flex flex-col items-center">
          <ol className="flex gap-x-2">
            <DataDifficultyNumber difficulty={10} />
            <DataDifficultyNumber difficulty={11} />
            <DataDifficultyNumber difficulty={12} />
            <DataDifficultyNumber difficulty={13} />
          </ol>
          <ol className="flex gap-x-2">
            <DataDifficultyNumber difficulty={14} />
            <DataDifficultyNumber difficulty={15} />
            <DataDifficultyNumber difficulty={16} />
            <DataDifficultyNumber difficulty={17} />
          </ol>
        </div>
      </div>
    </div>
  );
}
