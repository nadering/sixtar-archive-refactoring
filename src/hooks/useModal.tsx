import { RefObject, useEffect, useState } from "react";
import { useSetAtom } from "jotai";
// import { isUsingFullscreenModalAtom } from "@store";

// 모달 부분을 클릭하면 창이 열리고 유지되며,
// 모달 외의 부분을 클릭하면 창이 닫히는 Custom Hook
export default function useModal(
  wrapperRef: RefObject<HTMLElement>,
  event: "click" | "contextmenu" = "click"
) {
  const [modalOpen, setModalOpen] = useState(false);
  // const setIsUsingFullscreenModal = useSetAtom(isUsingFullscreenModalAtom);

  // 모달 부분이 클릭되면 실행되는 이벤트 리스너로, 모달 창을 열며 검정 화면을 불러옴
  const clickEventListener = () => {
    setModalOpen(true);
    // setIsUsingFullscreenModal(true);
  };

  useEffect(() => {
    // 모달 부분이 클릭되었는지, 바깥 부분이 클릭되었는지 확인
    // 바깥 부분이 클릭되었다면 모달 창을 닫으며, useEffect의 콜백 함수를 실행
    function handleClickOutside(e: { target: any }) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setModalOpen(false);
        // setIsUsingFullscreenModal(false);
      }
    }

    // 모달 부분을 클릭하면 창이 열리며, 모달 사용을 활성화하며 검정 화면을 불러옴
    const currentRef = wrapperRef.current;
    document.addEventListener("click", handleClickOutside);
    currentRef?.addEventListener(event, clickEventListener);

    // 모달 창이 닫힐 때 이벤트 리스너를 제거하며, 검정 화면을 없앰
    return () => {
      document.removeEventListener("click", handleClickOutside);
      currentRef?.removeEventListener(event, clickEventListener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return modalOpen;
}
