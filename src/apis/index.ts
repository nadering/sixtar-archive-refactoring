const API_URL = "https://api.sixtar-archive.kr";
export default API_URL;

import {
  getBoardDataByDifficultyNumber,
  PatternProp,
  FloorBoardProp,
  DifficultyBoardProp,
} from "./get-board-data";
import { getActiveVoteData, VoteProp } from "./get-vote-data";

export { getBoardDataByDifficultyNumber, getActiveVoteData };
export type { PatternProp, FloorBoardProp, DifficultyBoardProp, VoteProp };
