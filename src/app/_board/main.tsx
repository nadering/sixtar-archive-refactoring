"use client";

import { useAtomValue } from "jotai";
import { difficultyNumberAtom } from "@store";
import HomeInformation from "./home-information";
import Board from "./board";

// 메인 화면
export default function Main() {
  const difficultyNumber = useAtomValue(difficultyNumberAtom);

  return (
    <div className="flex flex-col grow justify-center items-center py-2">
      {difficultyNumber.selectedCount ? <Board /> : <HomeInformation />}
    </div>
  );
}
