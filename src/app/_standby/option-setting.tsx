import { useAtom } from "jotai";
import {
  displayMusicTitleAtom,
  displayDlcAtom,
  displayDifficultyTypeAtom,
  displayBpmAtom,
  ascendingOrderAtom,
} from "@/store";
import OptionCheckbox from "./option-checkbox";

export default function OptionSetting() {
  // 곡 제목
  const [displayMusicTitle, setDisplayMusicTitle] = useAtom(
    displayMusicTitleAtom
  );
  // DLC
  const [displayDlc, setDisplayDlc] = useAtom(displayDlcAtom);
  // 난이도 종류
  const [displayDifficultyType, setDisplayDifficultyType] = useAtom(
    displayDifficultyTypeAtom
  );
  // BPM
  const [displayBpm, setDisplayBpm] = useAtom(displayBpmAtom);
  // 오름차순 정렬
  const [ascendingOrder, setAscendingOrder] = useAtom(ascendingOrderAtom);

  return (
    <div className="flex flex-col items-stretch bg-white border-2 border-solar rounded-2xl px-3 py-2 gap-y-1 select-none">
      <OptionCheckbox
        id="display-music-title"
        text="곡 제목"
        defaultChecked={displayMusicTitle}
        onChange={() => {
          setDisplayMusicTitle((prev) => !prev);
        }}
      />
      <OptionCheckbox
        id="display-dlc"
        text="DLC"
        defaultChecked={displayDlc}
        onChange={() => {
          setDisplayDlc((prev) => !prev);
        }}
      />
      <OptionCheckbox
        id="display-difficulty-type"
        text="난이도 종류"
        defaultChecked={displayDifficultyType}
        onChange={() => {
          setDisplayDifficultyType((prev) => !prev);
        }}
      />
      <OptionCheckbox
        id="display-bpm"
        text="BPM"
        defaultChecked={displayBpm}
        onChange={() => {
          setDisplayBpm((prev) => !prev);
        }}
      />
      <OptionCheckbox
        id="ascending-order"
        text="오름차순 정렬"
        defaultChecked={ascendingOrder}
        onChange={() => {
          setAscendingOrder((prev) => !prev);
        }}
      />
    </div>
  );
}
