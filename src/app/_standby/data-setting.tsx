"use client";

import { useRef } from "react";
import { useAtom } from "jotai";
import { isModeSolarAtom, difficultyNumberAtom } from "@store";
import Image from "next/image";
import SolarLogo from "@logo/solar.webp";
import LunarLogo from "@logo/lunar.webp";
import ResetLogo from "@logo/reset.webp";
import DataDifficultyNumber from "./data-difficulty-number";

// 모드와 난이도 등, 서열표 API 호출에 직접적으로 관여된 데이터 설정 컴포넌트
export default function DataSetting() {
  // 애니메이션을 위한 Ref
  const resetButtonRef = useRef<HTMLButtonElement>(null);

  // 현재 모드 및 난이도
  const [isModeSolar, setIsModeSolar] = useAtom(isModeSolarAtom);
  const [difficultyNumber, setDifficultyNumber] = useAtom(difficultyNumberAtom);

  // 모드 변경
  const handleModeChange = () => {
    setIsModeSolar((prev) => !prev);
  };

  // 난이도 초기화 및 애니메이션 실행
  const resetDifficulty = () => {
    // 애니메이션 실행
    const animateClass = "animate-[spin_0.45s_ease-in-out]";
    if (
      difficultyNumber.selectedCount != 0 &&
      !resetButtonRef.current?.classList.contains(animateClass)
    ) {
      resetButtonRef.current?.classList.add(animateClass);

      setTimeout(() => {
        resetButtonRef.current?.classList.remove(animateClass);
      }, 450);
    }

    // 난이도 초기화
    setDifficultyNumber({
      selectedCount: 0,
    });
  };

  // 모드에 따른 필터 적용값
  const filterVariants = {
    // solar-400
    solar:
      "[filter:invert(65%)_sepia(28%)_saturate(1675%)_hue-rotate(301deg)_brightness(103%)_contrast(99%)]",
    // lunar-800
    lunar:
      "[filter:invert(22%)_sepia(39%)_saturate(1507%)_hue-rotate(209deg)_brightness(91%)_contrast(85%)]",
    // gray-400
    gray: "[filter:invert(80%)_sepia(0%)_saturate(28%)_hue-rotate(223deg)_brightness(90%)_contrast(92%)]",
  };

  return (
    <div className="flex flex-col items-center bg-white border-2 border-solar rounded-2xl px-4 py-2 gap-y-1 shadow-xl select-none">
      <div className="flex flex-col items-center">
        <p className="text-solar text-3xl text-center font-bold">MODE</p>
        <Image
          className={`mt-[-12px] cursor-pointer [-webkit-user-drag:none] [transition:filter_0s,transform_.15s]
            ${
              isModeSolar ? filterVariants["solar"] : filterVariants["lunar"]
            } hover:scale-110`}
          src={isModeSolar ? SolarLogo : LunarLogo}
          alt="mode-logo"
          width={120}
          onClick={handleModeChange}
          priority
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
          <button
            className={`cursor-default mt-1`}
            ref={resetButtonRef}
            onClick={resetDifficulty}
          >
            <Image
              className={`[-webkit-user-drag:none] [transition:filter_0s,transform_.15s]
                ${
                  difficultyNumber.selectedCount == 0
                    ? `${filterVariants["gray"]}`
                    : `cursor-pointer ${filterVariants["solar"]} hover:scale-110`
                }`}
              src={ResetLogo}
              alt="reset-logo"
              width={32}
              priority
            />
          </button>
        </div>
      </div>
    </div>
  );
}
