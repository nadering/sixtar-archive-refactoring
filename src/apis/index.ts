const API_URL = "https://api.sixtar-archive.kr";
export default API_URL;

import {
  getSingleBoardData,
  getMultipleBoardData,
  PatternProp,
  FloorBoardProp,
  DifficultyBoardProp,
} from "./get-board-data";
export { getSingleBoardData, getMultipleBoardData };
export type { PatternProp, FloorBoardProp, DifficultyBoardProp };
