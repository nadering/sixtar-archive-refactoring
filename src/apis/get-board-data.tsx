import API_URL from ".";

// 패턴 정보
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

// 층수 및 패턴 정보
export interface FloorBoardProp {
  floor: number;
  patterns: PatternProp[];
}

// 난이도 및 층수 정보
export interface DifficultyBoardProp {
  difficulty: number;
  floors: FloorBoardProp[];
}

// 서열표 데이터를 가공해서 반환
const refineBoardData = (data: DifficultyBoardProp[]) => {
  // 1. 데이터를 층수 단위로 분리
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

  // 2. 중복되는 패턴을 제거
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

  // 3. 층수 단위로 분리된 데이터를 난이도 단위로 묶음
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


// 단일 난이도의 서열표 데이터를 가져온 후 가공하여 반환
export const getSingleBoardData = async (mode: string, difficulty: number) => {
  // 데이터를 API에서 가져옴
  let data: DifficultyBoardProp[] = [];

  const json = await (
    await fetch(
      `${API_URL}/board?mode=${mode}&min=${difficulty}&max=${difficulty}`
    )
  ).json();

  if (json?.board) {
    data = json.board as DifficultyBoardProp[];
  }

  if (data.length == 0) {
    return;
  }

  return refineBoardData(data);
};


// 여러 난이도의 서열표 데이터를 가져온 후 가공하여 반환
export const getMultipleBoardData = async (
  mode: string,
  firstDifficulty: number,
  secondDifficulty: number,
) => {
  // 데이터를 API에서 가져옴
  let data: DifficultyBoardProp[] = [];

  let urls: string[] = [];
  for (
    let difficulty: number = firstDifficulty;
    difficulty <= secondDifficulty;
    difficulty++
  ) {
    urls.push(
      `${API_URL}/board?mode=${mode}&min=${difficulty}&max=${difficulty}`
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

  if (data.length == 0) {
    return;
  }

  return refineBoardData(data);
};

/* 
// Deprecated: NO SSR Function
// 현재 선택된 난이도 범위에서 서열표 데이터를 가져온 후 가공하여 반환
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
 */