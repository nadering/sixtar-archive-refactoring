"use client";

import { useAtom } from "jotai";
import { difficultyNumberAtom, difficultyMouseOverNumberAtom } from "@/store";
import { useState, useEffect } from "react";

interface rangeType {
  status: "normal" | "selected" | "inRange" | "outRange";
}

// 난이도 숫자 하나하나를 맡는 컴포넌트
export default function DataDifficultyNumber({
  difficulty,
}: {
  difficulty: number;
}) {
  // 현재 난이도가 범위에 속해있는지 아닌지
  const [range, setRange] = useState<rangeType>({
    status: "normal",
  });

  // 선택된 난이도
  const [difficultyNumber, setDifficultyNumber] = useAtom(difficultyNumberAtom);

  // 마우스 오버된 난이도 (선택된 난이도가 1개일 때 사용됨)
  const [difficultyMouseOverNumber, setDifficultyMouseOverNumber] = useAtom(
    difficultyMouseOverNumberAtom
  );

  // 현재 난이도 범위 상태에 따라 디자인 변경
  const colorVariants = {
    normal: "text-gray-800 font-medium cursor-pointer",
    selected: "text-lunar-800 font-bold cursor-pointer",
    inRange: "!text-lunar-400 !font-semibold !cursor-default",
    outRange: "!text-gray-200 !font-medium !cursor-default",
  };

  // 난이도가 마우스 오버됐을 때 이벤트 처리
  const handleMouseOver = () => {
    setDifficultyMouseOverNumber(difficulty);
  };

  // 난이도에서 마우스를 옮기면 보여주던 범위를 취소시킴
  const handleMouseOut = () => {
    setDifficultyMouseOverNumber(0);
  };

  // 난이도가 클릭됐을 때 이벤트 처리
  const handleClick = () => {
    if (difficultyNumber.selectedCount == 0) {
      // 기존에 클릭된 난이도가 없다면, 현재 난이도가 첫 번째 선택된 난이도
      setDifficultyNumber({
        selectedCount: 1,
        firstNum: difficulty,
      });
    } else if (difficultyNumber.selectedCount == 1) {
      // 기존에 클릭된 난이도가 1개 있다면,
      // 해당 난이도가 다시 클릭되었는지 아니면 새로운 난이도가 클릭되었는지에 따라 다름
      if (difficultyNumber.firstNum! == difficulty) {
        // 클릭되어 있던 난이도가 다시 클릭된 경우, 선택된 난이도가 없어짐
        setDifficultyNumber({
          selectedCount: 0,
        });
      } else {
        // 새로운 난이도가 클릭된 경우, 선택된 난이도가 2개가 됨
        if (difficultyNumber.firstNum! > difficulty) {
          setDifficultyNumber({
            selectedCount: 2,
            firstNum: difficulty,
            secondNum: difficultyNumber.firstNum,
          });
        } else {
          setDifficultyNumber({
            selectedCount: 2,
            firstNum: difficultyNumber.firstNum,
            secondNum: difficulty,
          });
        }
      }
    } else {
      // 기존에 클릭된 난이도가 2개 있다면,
      // 선택되어 있던 난이도를 다시 클릭할 때만 1개로 돌아감
      if (difficultyNumber.firstNum! == difficulty) {
        setDifficultyNumber({
          selectedCount: 1,
          firstNum: difficultyNumber.secondNum,
        });
        // 현재 난이도에 마우스 오버되도록 보정
        setDifficultyMouseOverNumber(difficulty);
      } else if (difficultyNumber.secondNum! == difficulty) {
        setDifficultyNumber({
          selectedCount: 1,
          firstNum: difficultyNumber.firstNum,
        });
        // 현재 난이도에 마우스 오버되도록 보정
        setDifficultyMouseOverNumber(difficulty);
      }
      // 선택되어 있지 않던 난이도를 클릭해도 아무 일도 일어나지 않음
    }
  };

  // 난이도가 선택됨에 따라 난이도 표시 범위가 설정됨
  useEffect(() => {
    if (difficultyNumber.selectedCount == 2) {
      // 선택된 난이도가 2개면, 선택된 난이도는 selected로,
      // 그 사이에 있는 난이도는 inRange로, 그 외의 난이도는 outRange로 설정
      if (
        difficulty == difficultyNumber.firstNum! ||
        difficulty == difficultyNumber.secondNum!
      ) {
        setRange({ status: "selected" });
      } else {
        if (
          difficultyNumber.firstNum! < difficulty &&
          difficulty < difficultyNumber.secondNum!
        ) {
          setRange({ status: "inRange" });
        } else {
          setRange({ status: "outRange" });
        }
      }
    } else if (difficultyNumber.selectedCount == 1) {
      // 선택된 난이도가 1개면, 선택된 난이도는 selected로,
      // 선택되어 있는 1개의 난이도를 제외하고 나머지는 normal로 설정
      if (difficulty == difficultyNumber.firstNum!) {
        setRange({ status: "selected" });
      } else {
        setRange({ status: "normal" });
      }
    } else {
      setRange({ status: "normal" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [difficultyNumber.selectedCount]);

  // 난이도가 1개 선택된 상태에서, 마우스 입력에 따라 미리 보여주는 범위가 설정됨
  useEffect(() => {
    if (difficultyNumber.selectedCount == 1) {
      if (difficultyMouseOverNumber == 0) {
        // 난이도에 마우스가 오버되어 있지 않은 경우
        // 선택되어 있는 1개의 난이도를 제외하고 나머지는 normal로 설정
        if (difficulty != difficultyNumber.firstNum!) {
          setRange({ status: "normal" });
        }
      } else {
        // 난이도에 마우스가 오버되어 있는 경우
        if (difficulty != difficultyNumber.firstNum!) {
          const [smallNumber, bigNumber] =
            difficultyNumber.firstNum! > difficultyMouseOverNumber
              ? [difficultyMouseOverNumber, difficultyNumber.firstNum!]
              : [difficultyNumber.firstNum!, difficultyMouseOverNumber];

          if (smallNumber < difficulty && difficulty < bigNumber) {
            setRange({ status: "inRange" });
          } else {
            setRange({ status: "normal" });
          }
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [difficultyNumber.selectedCount, difficultyMouseOverNumber]);

  return (
    <li
      className={`text-center text-2xl ${colorVariants[range.status]}
      hover:text-lunar-600 hover:font-bold hover:cursor-pointer`}
      onClick={handleClick}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      {difficulty}
    </li>
  );
}
