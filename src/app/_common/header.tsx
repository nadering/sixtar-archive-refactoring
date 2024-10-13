"use client";

import { useRef } from "react";
import Image from "next/image";
import useModal from "@/hooks/useModal";
import MainLogo from "@logo/main.webp";
import { StandbyModal } from "@/app/_standby";

export default function Header() {
  const standbyModalRef = useRef(null);
  const standbyModalActive = useModal(standbyModalRef);

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
  };

  return (
    <header className="flex flex-row-reverse h-16 border-b-2 border-gray-500 px-1">
      <div className="flex flex-col items-end" ref={standbyModalRef}>
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
    </header>
  );
}
