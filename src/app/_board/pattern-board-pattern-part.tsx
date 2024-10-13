import { useAtomValue } from "jotai";
import Image from "next/image";
import { PatternProp } from "@/apis";
import {
  displayMusicTitleAtom,
  displayDlcAtom,
  displayDifficultyTypeAtom,
  displayBpmAtom,
} from "@/store";

// 패턴 단일 컴포넌트
export default function PatternBoardPatternPart({
  musicId,
  name,
  composer,
  dlcName,
  dlcCode,
  musicPackName,
  musicPackId,
  type,
  bpm,
  bpmMin,
  bpmMax,
}: PatternProp) {
  const displayMusicTitle = useAtomValue(displayMusicTitleAtom);
  const displayDlc = useAtomValue(displayDlcAtom);
  const displayDifficultyType = useAtomValue(displayDifficultyTypeAtom);
  const displayBpm = useAtomValue(displayBpmAtom);

  // DLC 코드 매칭
  type dlcCodeList =
    | "fd"
    | "ld"
    | "th1"
    | "poc"
    | "ymh"
    | "wac"
    | "osh"
    | "dys"
    | "uni";
  const dlcColorMatching = {
    fd: "text-flower-and-destiny",
    ld: "text-luminous-and-darkness",
    th1: "text-touhou-project-pack-1",
    poc: "text-pocotone",
    ymh: "text-yomoha-planet",
    wac: "text-wacca",
    osh: "text-oshiribeat",
    dys: "text-dystopia",
    uni: "text-united-netwalk",
  };

  // BPM 문자열 미리 생성
  let bpmString = "";
  if (bpm) {
    bpmString += parseFloat(bpm);
  } else {
    if (bpmMin && bpmMax) {
      bpmString += parseFloat(bpmMin);
      bpmString += "\n~";
      bpmString += parseFloat(bpmMax);
    } else {
      bpmString += " - ";
    }
  }

  return (
    <div className="flex flex-col justify-start items-center w-24 min-w-24 gap-y-2">
      <div className="relative">
        <Image
          className="aspect-square shadow-music-thumbnail select-none"
          src={`/thumbnail/${musicId}.webp`}
          alt={name}
          title={name}
          width={100}
          height={100}
        />
        {displayDlc && dlcCode !== null && (
          <p
            className={`absolute left-0 top-0 bg-black/[.75] text-base ${
              dlcColorMatching[dlcCode.toLowerCase() as dlcCodeList]
            } font-semibold whitespace-pre-line leading-none px-2 py-1`}
          >
            {dlcCode.toUpperCase()}
          </p>
        )}
        {displayDifficultyType && (
          <Image
            className="absolute right-0 bottom-0 aspect-[8/9]"
            src={`/difficulty/${type}.webp`}
            alt={`${type}`}
            width={24}
            height={27}
            priority
          />
        )}
        {displayBpm && (
          <p className="absolute left-0 bottom-0 bg-black/[.75] text-base text-gray-300 font-semibold whitespace-pre-line leading-none px-2 py-1">
            {bpmString}
          </p>
        )}
      </div>
      {displayMusicTitle && (
        <p className="max-w-full text-base text-center text-black font-normal leading-music-title break-words">
          {name}
        </p>
      )}
    </div>
  );
}
