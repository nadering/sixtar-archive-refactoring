"use client";

import { useRef, useEffect, useState } from "react";
import { getActiveVoteData, VoteProp } from "@apis";
import { useModal } from "@hooks";
import { StandbyModal } from "@standby";
import { VoteModal } from "@vote";
import Image from "next/image";
import MainLogo from "@logo/main.webp";
import ExclamationMarkLogo from "@logo/exclamation-mark-logo.webp";

export default function Header() {
  // 스탠바이 모달 (모드, 난이도, 사용자 설정)
  const standbyModalRef = useRef(null);
  const standbyModalActive = useModal(standbyModalRef);

  // 투표 모달 (서열표 투표)
  const voteModalRef = useRef(null);
  const [voteData, setVoteData] = useState<VoteProp[]>([]);
  const voteModalActive = useModal(voteModalRef);

  const filterVariants = {
    // solar-200
    normal:
      "[filter:invert(83%)_sepia(9%)_saturate(908%)_hue-rotate(298deg)_brightness(101%)_contrast(102%)]",
    // solar-300
    hover:
      "[filter:invert(69%)_sepia(16%)_saturate(1079%)_hue-rotate(298deg)_brightness(103%)_contrast(103%)]",
    // solar-400
    active:
      "[filter:invert(65%)_sepia(28%)_saturate(1675%)_hue-rotate(301deg)_brightness(103%)_contrast(99%)]",
    // gray-200
    inactive:
      "[filter:invert(98%)_sepia(2%)_saturate(548%)_hue-rotate(357deg)_brightness(114%)_contrast(75%)]",
  };

  // 서열표 투표 여부 데이터를 갖고옴
  useEffect(() => {
    async function getActiveVoteDataWrapper() {
      const data = await getActiveVoteData();
      if (data) {
        setVoteData(data);
      }
    }

    getActiveVoteDataWrapper();
  }, []);

  return (
    <header className="relative flex flex-row-reverse items-center h-16 border-b-2 border-gray-500 gap-x-6 px-1">
      <div ref={standbyModalRef}>
        <Image
          className={`aspect-square cursor-pointer select-none [-webkit-user-drag:none] duration-150
          ${
            standbyModalActive
              ? filterVariants["active"]
              : filterVariants["normal"]
          }
          hover:[filter:invert(69%)_sepia(16%)_saturate(1079%)_hue-rotate(298deg)_brightness(103%)_contrast(103%)]`}
          src={MainLogo}
          alt="main-logo"
          width={64}
        />
        {standbyModalActive && <StandbyModal />}
      </div>
      <div ref={voteModalRef}>
        <Image
          className={`aspect-square select-none [-webkit-user-drag:none] duration-150
          ${
            voteData.length != 0
              ? voteModalActive
                ? `${filterVariants["active"]} cursor-pointer`
                : `${filterVariants["normal"]} cursor-pointer`
              : filterVariants["inactive"]
          }
          ${
            voteData.length != 0 &&
            "hover:[filter:invert(69%)_sepia(16%)_saturate(1079%)_hue-rotate(298deg)_brightness(103%)_contrast(103%)]"
          }
          `}
          src={ExclamationMarkLogo}
          alt="vote-logo"
          width={40}
        />
        {voteData.length != 0 && voteModalActive && (
          <VoteModal data={voteData} />
        )}
      </div>
    </header>
  );
}
