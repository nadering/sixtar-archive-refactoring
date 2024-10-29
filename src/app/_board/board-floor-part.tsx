import { useAtomValue } from "jotai";
import { FloorBoardProp } from "@apis";
import { isModeSolarAtom } from "@store";
import PatternBoardPatternPart from "./board-pattern-part";

// 현재 층수 및 해당하는 패턴들 목록 컴포넌트
export default function BoardFloorPart({
  floor,
  patterns,
}: FloorBoardProp) {
  const floorString = Number.isInteger(floor) ? floor + ".X" : floor.toString();
  const isModeSolar = useAtomValue(isModeSolarAtom);

  const colorVariants = {
    solar: "text-solar",
    lunar: "text-lunar",
  };

  return (
    <div className="flex flex-col w-full gap-y-2 py-8 border-b border-gray-400 first:pt-0 last:pb-0 last:border-0">
      <div className="flex items-end">
        <span
          className={`text-6xl text-start font-semibold ${
            isModeSolar ? colorVariants["solar"] : colorVariants["lunar"]
          }`}
        >
          {floorString.substring(0, floorString.indexOf("."))}
        </span>
        <span
          className={`text-5xl text-start translate-y-[-2px] font-semibold ${
            isModeSolar ? colorVariants["solar"] : colorVariants["lunar"]
          }`}
        >
          {floorString.substring(floorString.indexOf("."))}
        </span>
      </div>
      <div className="flex w-full max-w-full flex-wrap px-3 gap-3">
        {patterns.map((item, index) => {
          return (
            <PatternBoardPatternPart
              key={index}
              musicId={item.musicId}
              name={item.name}
              composer={item.composer}
              dlcName={item.dlcName}
              dlcCode={item.dlcCode}
              musicPackName={item.musicPackName}
              musicPackId={item.musicPackId}
              type={item.type}
              bpm={item.bpm}
              bpmMin={item.bpmMin}
              bpmMax={item.bpmMax}
            />
          );
        })}
      </div>
    </div>
  );
}
