"use client";

import { useState, useEffect } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { useRouter } from "next/navigation";
import {
  isModeSolarAtom,
  difficultyNumberAtom,
  ascendingOrderAtom,
} from "@store";
import { DifficultyBoardProp } from "@apis";
import { BoardDifficultyPart } from "@board";

// 서열표 컴포넌트
export default function Board({
  mode,
  firstDifficulty,
  secondDifficulty,
  data,
}: {
  mode: string;
  firstDifficulty: number;
  secondDifficulty?: number;
  data: DifficultyBoardProp[] | undefined;
}) {
  // Router
  const router = useRouter();

  // 서열표 데이터
  const [boardData, setBoardData] = useState<DifficultyBoardProp[]>([]);

  // 모드 및 난이도
  const setIsModeSolar = useSetAtom(isModeSolarAtom);
  const setDifficultyNumber = useSetAtom(difficultyNumberAtom);

  // 오름차순 여부
  const ascendingOrder = useAtomValue(ascendingOrderAtom);

  useEffect(() => {
    // Dynamic Routing 데이터 검증
    const modeList = ["solar", "lunar"];
    if (!modeList.includes(mode)) router.push("/");

    const minDifficulty = 10;
    const maxDifficulty = 17;
    if (firstDifficulty < minDifficulty || firstDifficulty > maxDifficulty)
      router.push("/");

    if (secondDifficulty) {
      if (secondDifficulty < minDifficulty || secondDifficulty > maxDifficulty)
        router.push("/");
    }

    // Dynamic Routing 데이터 반영
    if (mode == "solar") {
      setIsModeSolar(true);
    } else {
      setIsModeSolar(false);
    }

    if (secondDifficulty) {
      const smallerDifficulty = Math.min(firstDifficulty, secondDifficulty);
      const biggerDifficulty = Math.max(firstDifficulty, secondDifficulty);

      setDifficultyNumber({
        selectedCount: 2,
        firstNum: smallerDifficulty,
        secondNum: biggerDifficulty,
      });
    } else {
      setDifficultyNumber({
        selectedCount: 1,
        firstNum: firstDifficulty,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, firstDifficulty, secondDifficulty]);

  useEffect(() => {
    // API로 가져온 데이터 검증
    if (!data) {
      router.push("/");
    } else {
      setBoardData(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    // 오름차순 정렬 여부가 바뀌면, 데이터를 새로 가져오지 않고 순서만 변경
    console.log(`${ascendingOrder}`);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ascendingOrder]);

  return (
    <>
      {boardData.length != 0 &&
        boardData.map((difficultyData) => {
          return (
            <BoardDifficultyPart
              key={difficultyData.difficulty}
              difficulty={difficultyData.difficulty}
              floors={difficultyData.floors}
            />
          );
        })}
    </>
  );
}
