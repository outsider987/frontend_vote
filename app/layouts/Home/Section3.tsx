/* eslint-disable react/no-unescaped-entities */
"use client";
import clsx from "clsx";
import { useEffect, useState } from "react";

const Section3 = ({ className }: { className?: string }) => {
  const [scale, setScale] = useState(1);
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = () => {
    // Calculate scale factor based on scroll position
    const currentScrollY = window.scrollY;
    setScrollY(currentScrollY);
    const newScale = 1 + currentScrollY / 1000; // Adjust divisor to control scale sensitivity
    setScale(newScale);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div
      className={clsx(
        "flex w-full md:flex-col sm:flex-col items-center sm:gap-10 justify-between bg-black text-white",
        className // This will allow custom classes to be added to the component
      )}
    >
      <div className="bg-gradient-to-br w-2/3 max-w-[600px] sm:w-full from-blue-400 to-purple-600  ">
        <video
          autoPlay
          loop
          muted
          className="w-full h-full object-cover rounded-2xl"
          src={
            "https://turquoise-rapid-marmot-585.mypinata.cloud/ipfs/QmWi7XFeVzKzLwbVujiRAWVP8RJYAFbcLYpDw8QmRe2SaE/ball.mp4"
          }
        ></video>
      </div>
      <div className=" mt-8 w-1/3 sm:w-full md:w-full ">
        <div className="max-w-[22.5rem] flex flex-col">
          <h1 className="text-[46px] flex flex-col sm:text-[32px] font-bold leading-[55px] sm:max-w-[70%]">
            <div className="inline-flex gap-2 tracking-[2px]">
              <span className="leading-[55px] tracking-[2px]">Creation</span>
              {"  "}
              <span className="font-semibold leading-[55px] tracking-[2px]">
                with
              </span>
            </div>
            <span className="italic font-light leading-[55px] tracking-[2px]">
              Genetic Code
            </span>
          </h1>
          <p className="mt-6 text-base sm:text-[14px] leading-6 text-[#C1C1C1] ">
            Each life form's genetic code determines its appearance and
            vitality, making every user's creation unique.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Section3;
