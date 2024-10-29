import { atom } from "jotai";

// 모달
export const isUsingFullscreenModalAtom = atom(false);

// 사용자 설정 데이터
// 모드
export const isModeSolarAtom = atom(true);

// 난이도 설정에 필요한 타입
export interface difficultyNumberType {
  selectedCount: number;
  firstNum?: number;
  secondNum?: number;
}

// 현재 난이도
export const difficultyNumberAtom = atom<difficultyNumberType>({
  selectedCount: 0,
});

// 마우스 오버 시 색상 변화를 위한 아톰
export const difficultyMouseOverNumberAtom = atom(0);

// 사용자 설정
export const displayMusicTitleAtom = atom(true);
export const displayDlcAtom = atom(true);
export const displayDifficultyTypeAtom = atom(false);
export const displayBpmAtom = atom(false);
export const ascendingOrderAtom = atom(false);