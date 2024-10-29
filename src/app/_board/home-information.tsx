"use client";

import { useEffect } from "react";
import { useSetAtom } from "jotai";
import { difficultyNumberAtom } from "@store";
import Image from "next/image";
import InformationRami from "@public/information_rami.webp";

// 메인 화면에서 사이트 사용 방법을 안내해주는 컴포넌트
export default function HomeInformation() {
  // 난이도
  const setDifficultyNumber = useSetAtom(difficultyNumberAtom);

  useEffect(() => {
    // 설정된 난이도 초기화
    setDifficultyNumber({
      selectedCount: 0,
    });
  });

  return (
    <div className="flex flex-col items-center p-6 gap-y-5">
      <Image
        className="rounded-xl select-none"
        src={InformationRami}
        alt="information-rami"
        width={400}
        priority
      />
      <div className="flex flex-col items-center gap-y-1">
        <p className="text-black text-4xl text-center font-bold">
          현재 선택된 난이도가 없습니다.
        </p>
        <div className="flex flex-col items-center text-black text-lg text-center font-normal">
          <p>
            <span className="text-solar-600">우측 상단 별 아이콘</span>에서
            모드와 난이도를 선택해주세요.
          </p>
          <p>
            최소/최대 난이도를 동시에 선택하면 여러 난이도를 동시에 볼 수
            있어요.
          </p>
        </div>
      </div>
    </div>
  );
}
