"use client";
import Button from "@/app/components/Button";
import React, { useEffect, useState } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import clsx from "clsx";
import CommingModal from "@/app/components/Modal/Comming";

const Section2 = ({ className }: { className?: string }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isCommingVisible, setIsCommingVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const sectionRef = document.querySelector("#section2");

    const handleScroll = () => {
      if (!sectionRef) return;
      const rect = sectionRef.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementHeight = rect.height;

      // Calculate the scroll progress
      const start = rect.top - windowHeight;
      const end = rect.top + elementHeight;
      const progress = Math.min(
        Math.max((window.scrollY - start) / (end - start), 0),
        1
      );
      setScrollProgress(progress);
    };

    // Add scroll listener immediately
    window.addEventListener("scroll", handleScroll);

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionRef) {
      observer.observe(sectionRef);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (sectionRef) {
        observer.unobserve(sectionRef);
      }
    };
  }, []);

  //   const computedOpacity = 0.05 + scrollProgress * 0.9;
  //   const computedScale = 1.5 - scrollProgress * 0.8;

  const computedOpacity = 0.8;
  const computedScale = 0.8;

  return (
    <div
      id="section2"
      className={clsx(
        "flex w-full flex-col items-center justify-center min-h-[1024px] relative text-white p-8",
        className
      )}
    >
      <div className="w-1/2">
        <div
          className="absolute w-full h-full top-0 left-0 max-w-[100vw]"
          style={{
            filter: "blur(100px)",

            zIndex: 0,
            opacity: computedOpacity,
            transform: `scale(${computedScale})`,
          }}
        >
          <div className="absolute top-1/2 left-1/2 w-full h-full transform -translate-x-1/2 -translate-y-1/2">
            <div className="absolute rounded-full top-1/2 left-1/2 min-w-[1400px] h-[1024px] min-w-[1400px] transform -translate-x-1/2 -translate-y-1/2  overflow-hidden">
              <div className="absolute top-1/2 left-1/2 w-[1400px] h-[1024px] transform -translate-x-1/2 -translate-y-1/2 bg-conic-gradient animate-spin-slow"></div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="z-[3] flex flex-col items-center justify-center"
        style={{ pointerEvents: "auto" }}
      >
        <h1 className="text-[28px] sm:text-[24px] mb-10  text-center max-w-[854px] leading-[34px] tracking-[2%]">
          LIFETIME is a life imagination DApp that allows users to create and
          nurture virtual life forms on the blockchain.
        </h1>
        <p className="text-[16px] sm:text-[14px] leading-[24px] mb-12 text-center text-[#C1C1C1] max-w-[850px]">
          Ｗitness the growth and changes of their virtual life through regular
          care and the passage of blockchain time. Cultivating your own unique
          on-chain life forms.
        </p>
        <Button
          mode="primaryOutline"
          className="flex items-center justify-center gap-2"
          rounded
          style={{ boxShadow: "0px 0px 10px 0px #FFFFFF4D" }}
          onClick={() => setIsCommingVisible(true)}
        >
          GET STARTED <ArrowForwardIcon />
        </Button>
      </div>
      <CommingModal show={isCommingVisible} setShow={setIsCommingVisible} />
    </div>
  );
};

export default Section2;
