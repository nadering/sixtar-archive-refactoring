"use client";

import { useAtomValue } from "jotai";
import { isUsingFullscreenModalAtom } from "@store";
import { useEffect } from "react";

// 전체 화면을 약간 어둡게 덮어버리는 컴포넌트
// 모달은 Z-index로 인해 이 컴포넌트 위로 올라와 작동할 수 있음
export default function FullscreenDarkModal() {
  const isUsingFullscreenModal = useAtomValue(isUsingFullscreenModalAtom);

  // 스크롤 방지
  useEffect(() => {
    if (isUsingFullscreenModal) document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isUsingFullscreenModal]);

  return (
    <>
      {isUsingFullscreenModal ? (
        <div className="fixed top-0 right-0 bottom-0 left-0 z-20 bg-black opacity-25"></div>
      ) : (
        <></>
      )}
    </>
  );
}
