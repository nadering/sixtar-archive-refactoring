import { atom } from "jotai";

// Modal
export const isUsingFullscreenModalAtom = atom(false);

// Data
// Difficulty Mode
export const isModeSolarAtom = atom(true);

// Difficulty Number
interface difficultyNumberType {
  selectedCount: number;
  firstNum?: number;
  secondNum?: number;
}

export const difficultyNumberAtom = atom<difficultyNumberType>({
  selectedCount: 0,
});

export const difficultyMouseOverNumberAtom = atom(0);

// Option
export const displayMusicTitleAtom = atom(true);
export const displayDlcAtom = atom(true);
export const displayDifficultyTypeAtom = atom(false);
export const displayBpmAtom = atom(false);
export const ascendingOrderAtom = atom(false);