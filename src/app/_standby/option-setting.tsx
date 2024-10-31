"use client";

import { useAtom } from "jotai";
import {
  displayMusicTitleAtom,
  displayDlcAtom,
  displayDifficultyTypeAtom,
  displayBpmAtom,
  ascendingOrderAtom,
} from "@store";
import OptionCheckbox from "./option-checkbox";
import { useEffect } from "react";

// 곡 제목 표기, DLC, 난이도 종류 등 서열표 표기에 관여된 옵션 설정 컴포넌트
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

  // localStorage 활용
  const localMusicTitle = localStorage.getItem("displayMusicTitle");
  const localDlc = localStorage.getItem("displayDlc");
  const localDifficultyType = localStorage.getItem("displayDifficultyType");
  const localBpm = localStorage.getItem("displayBpm");
  const localAscendingOrder = localStorage.getItem("ascendingOrder");

  // localStorage에 저장된 값이 true/false인지 확인
  const isBooleanString = (str: string | null) => {
    if (str == null) return false;
    if (str == "true" || str == "false") return true;
    return false;
  };

  useEffect(() => {
    // localStorage에 저장된 값을 적용함
    if (isBooleanString(localMusicTitle))
      setDisplayMusicTitle(JSON.parse(localMusicTitle!));

    if (isBooleanString(localDlc)) setDisplayDlc(JSON.parse(localDlc!));

    if (isBooleanString(localDifficultyType))
      setDisplayDifficultyType(JSON.parse(localDifficultyType!));

    if (isBooleanString(localBpm)) setDisplayBpm(JSON.parse(localBpm!));

    if (isBooleanString(localAscendingOrder))
      setAscendingOrder(JSON.parse(localAscendingOrder!));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col items-stretch bg-white border-2 border-solar rounded-2xl px-3 py-2 gap-y-1 shadow-xl select-none">
      <OptionCheckbox
        id="display-music-title"
        text="곡 제목"
        defaultChecked={
          isBooleanString(localMusicTitle)
            ? JSON.parse(localMusicTitle!)
            : displayMusicTitle
        }
        onChange={() => {
          localStorage.setItem(
            "displayMusicTitle",
            (!displayMusicTitle).toString()
          );
          setDisplayMusicTitle((prev) => !prev);
        }}
      />
      <OptionCheckbox
        id="display-dlc"
        text="DLC"
        defaultChecked={
          isBooleanString(localDlc) ? JSON.parse(localDlc!) : displayDlc
        }
        onChange={() => {
          localStorage.setItem("displayDlc", (!displayDlc).toString());
          setDisplayDlc((prev) => !prev);
        }}
      />
      <OptionCheckbox
        id="display-difficulty-type"
        text="난이도 종류"
        defaultChecked={
          isBooleanString(localDifficultyType)
            ? JSON.parse(localDifficultyType!)
            : displayDifficultyType
        }
        onChange={() => {
          localStorage.setItem(
            "displayDifficultyType",
            (!displayDifficultyType).toString()
          );
          setDisplayDifficultyType((prev) => !prev);
        }}
      />
      <OptionCheckbox
        id="display-bpm"
        text="BPM"
        defaultChecked={
          isBooleanString(localBpm) ? JSON.parse(localBpm!) : displayBpm
        }
        onChange={() => {
          localStorage.setItem("displayBpm", (!displayBpm).toString());
          setDisplayBpm((prev) => !prev);
        }}
      />
      <OptionCheckbox
        id="ascending-order"
        text="오름차순 정렬"
        defaultChecked={
          isBooleanString(localAscendingOrder)
            ? JSON.parse(localAscendingOrder!)
            : ascendingOrder
        }
        onChange={() => {
          localStorage.setItem("ascendingOrder", (!ascendingOrder).toString());
          setAscendingOrder((prev) => !prev);
        }}
      />
    </div>
  );
}
