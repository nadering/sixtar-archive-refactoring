/* 
Deprecated: NO SSR Components

"use client";

import { useState, useEffect } from "react";
import { useAtomValue } from "jotai";
import {
  isModeSolarAtom,
  difficultyNumberAtom,
  ascendingOrderAtom,
} from "@store";
import { getBoardDataByDifficultyNumber, DifficultyBoardProp } from "@apis";
import Image from "next/image";
import SolarLogo from "@logo/solar.webp";
import LunarLogo from "@logo/lunar.webp";
import PatternBoardDifficultyPart from "./board-difficutly-part";

// 서열표 컴포넌트
export default function PatternBoard() {
  // 서열표 데이터
  const [boardData, setBoardData] = useState<DifficultyBoardProp[]>([]);

  const isModeSolar = useAtomValue(isModeSolarAtom);
  const difficultyNumber = useAtomValue(difficultyNumberAtom);
  const ascendingOrder = useAtomValue(ascendingOrderAtom);

  const filterVariants = {
    // solar-400
    solar:
      "[filter:invert(65%)_sepia(28%)_saturate(1675%)_hue-rotate(301deg)_brightness(103%)_contrast(99%)]",
    // lunar-800
    lunar:
      "[filter:invert(22%)_sepia(39%)_saturate(1507%)_hue-rotate(209deg)_brightness(91%)_contrast(85%)]",
  };

  const colorVariants = {
    solar: "text-solar",
    lunar: "text-lunar",
  };

  useEffect(() => {
    async function getBoardDataWrapper() {
      // 현재 선택된 난이도 범위에서 서열표 데이터를 가져와 저장
      const data = await getBoardDataByDifficultyNumber(
        difficultyNumber,
        isModeSolar
      );
      if (data) {
        if (ascendingOrder) {
          const reversedData = data
            .map((difficultyBoard, _) => {
              return {
                difficulty: difficultyBoard.difficulty,
                floors: difficultyBoard.floors.toReversed(),
              } as DifficultyBoardProp;
            })
            .toReversed();
          setBoardData(reversedData);
        } else {
          setBoardData(data);
        }
      }
    }

    if (difficultyNumber.selectedCount != 0) {
      getBoardDataWrapper();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModeSolar, difficultyNumber]);

  useEffect(() => {
    // 오름차순 정렬 여부가 바뀌면 데이터를 가져오지 않고 순서만 변경
    if (boardData) {
      setBoardData((prev) =>
        prev
          .map((difficultyBoard, _) => {
            return {
              difficulty: difficultyBoard.difficulty,
              floors: difficultyBoard.floors.toReversed(),
            } as DifficultyBoardProp;
          })
          .toReversed()
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ascendingOrder]);

  return (
    <div className="flex flex-col grow justify-start items-stretch w-full px-1">
      <div className="flex gap-x-1">
        <Image
          className={`w-9 h-9 select-none ${
            isModeSolar ? filterVariants["solar"] : filterVariants["lunar"]
          }`}
          src={isModeSolar ? SolarLogo : LunarLogo}
          alt="mode-logo"
          height={36}
          priority
        />
        <p
          className={`text-3xl text-center font-semibold ${
            isModeSolar ? colorVariants["solar"] : colorVariants["lunar"]
          }`}
        >
          {isModeSolar ? "SOLAR" : "LUNAR"}
        </p>
      </div>
      <div className="flex flex-col grow w-full translate-y-[-4px] px-3">
        {boardData.length != 0 &&
          boardData.map((difficultyData) => {
            return (
              <PatternBoardDifficultyPart
                key={difficultyData.difficulty}
                difficulty={difficultyData.difficulty}
                floors={difficultyData.floors}
              />
            );
          })}
      </div>
    </div>
  );
}
 */