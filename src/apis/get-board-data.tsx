import { difficultyNumberType } from "@/store";
import API_URL from ".";

// 서열표 데이터 중 패턴 하나의 속성
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

// 서열표의 층수 단위
export interface FloorBoardProp {
  floor: number;
  patterns: PatternProp[];
}

// 서열표의 난이도 단위
export interface DifficultyBoardProp {
  difficulty: number;
  floors: FloorBoardProp[];
}

// 현재 선택된 난이도 범위에서 서열표 데이터를 가져온 후 가공하여 반환
export const getBoardDataByDifficultyNumber = async (
  difficultyNumber: difficultyNumberType,
  isModeSolar: boolean
) => {
  // 데이터를 API에서 가져옴
  let data: DifficultyBoardProp[] = [];

  // 선택된 난이도가 없으면 진행하지 않음
  if (difficultyNumber.selectedCount == 0) {
    return;
  }

  if (difficultyNumber.selectedCount == 1) {
    // 선택된 난이도가 1개면, 단일 난이도 데이터를 가져옴
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
    // 선택된 난이도가 2개면, 여러 난이도 데이터를 가져옴
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

  // 반환된 데이터가 없다면, 서버 오류나 잘못된 입력 등이 발생했으므로 진행하지 않음
  if (data.length == 0) {
    return;
  }

  // 1. 데이터를 층수 단위로 분류
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

  // 2. 중복된 패턴을 제거
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

  // 3. 패턴을 다시 난이도와 층수 별로 분류
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

  // 4. 분류된 패턴을 반환
  resultData.push({
    difficulty: currentDifficulty,
    floors: [...tempFloorList],
  });

  return resultData;
};
