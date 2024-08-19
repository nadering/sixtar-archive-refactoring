import { difficultyNumberType } from "@/store";
import API_URL from ".";

export interface PatternProp {
  musicId: number;
  name: string;
  composer: string;
  dlcName: string | null;
  dlcCode: string | null;
  musicPackName: string | null;
  musicPackId: number | null;
  type: "comet" | "nova" | "supernova" | "quasar" | "starlight";
  bpm: string | null;
  bpmMin: string | null;
  bpmMax: string | null;
}

export interface FloorBoardProp {
  floor: number;
  patterns: PatternProp[];
}

export interface DifficultyBoardProp {
  difficulty: number;
  floors: FloorBoardProp[];
}

// 현재 선택된 난이도 범위에서 서열표 데이터를 가져온 후 가공하여 반환합니다.
export const getBoardDataByDifficultyNumber = async (
  difficultyNumber: difficultyNumberType,
  isModeSolar: boolean
) => {
  // 데이터를 API에서 가져옴
  let data: DifficultyBoardProp[] = [];

  if (difficultyNumber.selectedCount == 0) {
    return;
  }

  if (difficultyNumber.selectedCount == 1) {
    const json = await (
      await fetch(
        `${API_URL}/board?mode=${isModeSolar ? "solar" : "lunar"}&min=${
          difficultyNumber.firstNum
        }&max=${difficultyNumber.firstNum}`
      )
    ).json();

    if (json?.board) {
      data = json.board as DifficultyBoardProp[];
    }
  } else {
    let urls: string[] = [];
    for (
      let difficulty: number = difficultyNumber.firstNum as number;
      difficulty <= (difficultyNumber.secondNum as number);
      difficulty++
    ) {
      urls.push(
        `${API_URL}/board?mode=${
          isModeSolar ? "solar" : "lunar"
        }&min=${difficulty}&max=${difficulty}`
      );
    }

    const jsons = await Promise.all(
      urls.map(async (url) => {
        const res = await fetch(url);
        return res.json();
      })
    );
    let boardDataList: DifficultyBoardProp[] = jsons.map(
      (json) => json.board[0] as DifficultyBoardProp
    );
    data = boardDataList;
  }

  // 데이터를 가공해서 반환
  if (data.length == 0) {
    return;
  }

  let floorDataList: FloorBoardProp[] = [];
  data.forEach((difficultyData, _) => {
    difficultyData.floors.forEach((floorData, _) => {
      const floor: number = floorData.floor;

      let existsFloor = floorDataList
        .filter((item) => item.floor == floor)
        .at(0);
      if (existsFloor) {
        existsFloor.patterns.push(...floorData.patterns);
      } else {
        floorDataList.push(floorData);
      }
    });
  });

  floorDataList = floorDataList
    .map((data) => {
      const uniquePatterns = data.patterns.filter((pattern, index) => {
        return (
          data.patterns.findIndex(
            (item) =>
              item.musicId === pattern.musicId && item.type === pattern.type
          ) === index
        );
      });
      return { floor: data.floor, patterns: uniquePatterns };
    })
    .sort((a, b) => {
      return b.floor - a.floor;
    });

  let resultData: DifficultyBoardProp[] = [];
  let tempFloorList: FloorBoardProp[] = [];
  let currentDifficulty: number = Math.floor(
    floorDataList.at(0)?.floor as number
  );

  floorDataList.forEach((floorData, _) => {
    let difficulty: number = Math.floor(floorData.floor);

    if (currentDifficulty == difficulty) {
      tempFloorList.push(floorData);
    } else {
      resultData.push({
        difficulty: currentDifficulty,
        floors: [...tempFloorList],
      });
      currentDifficulty = difficulty;
      tempFloorList = [floorData];
    }
  });

  resultData.push({
    difficulty: currentDifficulty,
    floors: [...tempFloorList],
  });

  return resultData;
};
