const API_URL = "https://api.sixtar-archive.kr";
export default API_URL;

import {
  getBoardDataByDifficultyNumber,
  PatternProp,
  FloorBoardProp,
  DifficultyBoardProp,
} from "./get-board-data";
export { getBoardDataByDifficultyNumber };
export type { PatternProp, FloorBoardProp, DifficultyBoardProp };
