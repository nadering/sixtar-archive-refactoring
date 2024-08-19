import { DifficultyBoardProp } from "@/apis";
import PatternBoardFloorPart from "./pattern-board-floor-part";

// 현재 난이도 및 해당하는 층 목록 컴포넌트
export default function PatternBoardDifficultyPart({
  difficulty,
  floors,
}: DifficultyBoardProp) {
  return (
    <div className="flex flex-col w-full py-8 border-b-2 border-gray-400 first:pt-0 last:border-0">
      {floors.length != 0 &&
        floors.map((floorData) => {
          return (
            <PatternBoardFloorPart
              key={floorData.floor}
              floor={floorData.floor}
              patterns={floorData.patterns}
            />
          );
        })}
    </div>
  );
}
