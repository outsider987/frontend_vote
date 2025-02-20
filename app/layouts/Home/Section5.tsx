/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import Carousel from "@/app/components/Carousel";

const Section5 = ({ className }: { className?: string }) => {
  const [treeDeadVisible, setTreeDeadVisible] = useState(false);
  const [treeOpenVisible, setTreeOpenVisible] = useState(false);
  const treeDeadRef = useRef<HTMLImageElement>(null);
  const treeOpenRef = useRef<HTMLImageElement>(null);

  const liveImg =
    "https://turquoise-rapid-marmot-585.mypinata.cloud/ipfs/QmWi7XFeVzKzLwbVujiRAWVP8RJYAFbcLYpDw8QmRe2SaE/live.png";
  const deadImg =
    "https://turquoise-rapid-marmot-585.mypinata.cloud/ipfs/QmWi7XFeVzKzLwbVujiRAWVP8RJYAFbcLYpDw8QmRe2SaE/dead.png";

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === treeDeadRef.current && !treeDeadVisible) {
            setTreeDeadVisible(entry.isIntersecting);
          } else if (entry.target === treeOpenRef.current && !treeOpenVisible) {
            setTreeOpenVisible(entry.isIntersecting);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (treeDeadRef.current) observer.observe(treeDeadRef.current);
    if (treeOpenRef.current) observer.observe(treeOpenRef.current);

    return () => observer.disconnect();
  }, [treeDeadVisible, treeOpenVisible]);

  return (
    <>
      <div
        className={clsx(
          "sm:hidden flex w-full md:flex-col  sm:flex-col items-center gap-10 sm:gap-10 justify-center  bg-black text-white",
          className
        )}
      >
        <div className="mt-8 grid grid-rows-2  w-2/3 sm:w-full md:w-full  gap-[75px]">
          <div className="relative flex justify-end items-center">
            <img
              ref={treeDeadRef}
              src={deadImg}
              alt="Tree Dead"
              className={clsx(
                { "animate-raise": treeDeadVisible },
                "opacity-0 max-w-[345px]"
              )}
            />
          </div>

          <div className="max-w-[480px]">
            <h1 className="text-[46px] sm:text-[32px] md:text-[32px] font-semibold leading-[55px] sm:max-w-[300px] tracking-[2px]">
              Exciting Competition
              <span className="italic font-light tracking-[2px]">
                {" - "}Rebirth
              </span>
            </h1>
            <p className="mt-6 sm:mt-[31px] text-base sm:text-[14px] md:text-[14px] leading-[24px] text-[#C1C1C1]">
              Experience the competition of life through the Rebirth feature,
              where anyone can revive a dead LifeTree as their own.
            </p>
          </div>
        </div>
        <div className="relative rounded-xl w-1/2 h-full flex overflow-hidden ">
          <div className="w-full h-full flex justify-end items-center overflow-hidden">
            <img
              ref={treeOpenRef}
              src={liveImg}
              alt="Tree Open"
              className={clsx(
                { "animate-raise": treeOpenVisible },

                "opacity-0"
              )}
            />
          </div>
        </div>
      </div>
      <div className={clsx("hidden sm:flex mt-5 flex-col  gap-9", className)}>
        <Carousel images={[liveImg, deadImg]}></Carousel>

        <div className="max-w-[417px]">
          <h1 className="text-[46px] sm:text-[32px] md:text-[32px] font-bold leading-[55px] sm:max-w-[300px] tracking-[2px]">
            Exciting Competition —{" "}
            <span className="italic font-light tracking-[2px]">Rebirth</span>
          </h1>
          <p className="mt-6 text-base sm:text-[14px] md:text-[14px] leading-[24px] text-[#C1C1C1]">
            Add a competitive edge to your NFT experience with the Rebirth
            function. Reclaim dead trees and convert them back into LifeSeeds,
            offering you the chance to acquire and rejuvenate NFT assets
            previously owned by others.
          </p>
        </div>
      </div>
    </>
  );
};

export default Section5;
