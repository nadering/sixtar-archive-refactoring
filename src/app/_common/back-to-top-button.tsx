"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Uparrow from "@public/uparrow.webp";

export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisible);
    return () => {
      window.removeEventListener("scroll", toggleVisible);
    };
  }, []);

  return (
    <>
      {isVisible ? (
        <Image
          className="fixed z-10 bottom-8 right-5 cursor-pointer [transition:filter_0s,transform_.15s]
          scale-90 hover:scale-100 hover:[filter:invert(65%)_sepia(28%)_saturate(1675%)_hue-rotate(301deg)_brightness(103%)_contrast(99%)]"
          src={Uparrow}
          alt="back-to-top-button"
          width={48}
          onClick={scrollToTop}
        />
      ) : (
        <></>
      )}
    </>
  );
}
