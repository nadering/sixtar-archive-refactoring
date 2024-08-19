"use client";

import { useAtomValue } from "jotai";
import { isUsingFullscreenModalAtom } from "@/store";

export default function FullscreenDarkModal() {
  const isUsingFullscreenModal = useAtomValue(isUsingFullscreenModalAtom);

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
