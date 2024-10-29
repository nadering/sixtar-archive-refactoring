"use client";

import { useAtomValue } from "jotai";
import { difficultyNumberAtom } from "@store";
import HomeInformation from "./home-information";
import PatternBoard from "./pattern-board";

// 메인 화면
export default function MainBoard() {
  const difficultyNumber = useAtomValue(difficultyNumberAtom);

  return (
    <div className="flex flex-col grow justify-center items-center py-2">
      {difficultyNumber.selectedCount ? <PatternBoard /> : <HomeInformation />}
    </div>
  );
}
