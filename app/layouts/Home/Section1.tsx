/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import TreeImage from "@/public/images/Tree.webp";
import Grass from "@/public/images/Grass.webp";
import Sky from "@/public/images/Sky.webp";
import Star from "@/public/images/Star.webp";
import KV from "@/app/assets/kv.png";
import clsx from "clsx";

const Section1 = ({ className }: { className?: string }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollDistance = 500; // New variable for scroll distance

  //   useEffect(() => {
  //     const sectionRef = document.querySelector("#section1");

  //     const handleScroll = () => {
  //       if (!sectionRef) return;
  //       const rect = sectionRef.getBoundingClientRect();
  //       const windowHeight = window.innerHeight;

  //       // Calculate the scroll progress

  //       const progress = Math.min(
  //         (window.scrollY - rect.top) / (rect.bottom - rect.top),
  //         1
  //       );
  //       setScrollProgress(progress);
  //     };

  //     const observer = new IntersectionObserver(
  //       ([entry]) => {
  //         setIsVisible(entry.isIntersecting);
  //         if (entry.isIntersecting) {
  //           window.addEventListener("scroll", handleScroll);
  //         } else {
  //           window.removeEventListener("scroll", handleScroll);
  //         }
  //       },
  //       { threshold: 0.1 }
  //     );

  //     if (sectionRef) {
  //       observer.observe(sectionRef);
  //     }

  //     return () => {
  //       window.removeEventListener("scroll", handleScroll);
  //       if (sectionRef) {
  //         observer.unobserve(sectionRef);
  //       }
  //     };
  //   }, []);

  //   return (
  //     <section
  //       className="w-full h-screen"
  //       style={{
  //         backgroundImage: `url(${KV.src})`,
  //         backgroundSize: "cover",
  //         backgroundPosition: "center",
  //       }}
  //     >
  //       <div className="w-full h-full">
  //         {/* <img
  //           src={KV.src}
  //           alt="Sky background"
  //           className="w-full h-full object-cover object-bottom"
  //         /> */}
  //       </div>
  //     </section>
  //   );

  return (
    <section className="w-full">
      {/* Desktop */}
      <div className=" sm:hidden md:hidden">
        <div
          id="section1"
          className={clsx(
            "relative w-full min-h-[calc(100vh)] overflow-hidden px-14 ",
            className
          )}
        >
          <img
            src={Sky.src}
            alt="Sky background"
            className="absolute inset-0 w-full h-full object-cover object-bottom"
          />
          {/* Tree */}
          <div className="absolute w-[90%] bottom-0 left-1/2 transform -translate-x-1/2">
            <img
              src={TreeImage.src}
              alt="Tree"
              className="w-full"
              //   style={{
              //     transform: `translateY(${
              //       scrollProgress * scrollDistance
              //     }px) scale(${1 + scrollProgress})`,
              //   }}
            />
          </div>

          {/* Grass */}
          <div className="absolute w-full bottom-0 left-1/2 transform -translate-x-1/2">
            <img
              src={Grass.src}
              alt="Grass"
              className="w-full"
              //   style={{
              //     transform: `translateY(${scrollProgress * scrollDistance}px)`,
              //   }}
            />
          </div>

          {/* Sky */}
          <div className="absolute top-1/2 left-1/2 flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 text-center text-white w-full">
            <h1
              style={{
                animation: "fadeIn 2s ease-in-out forwards",
              }}
              className=" text-9xl lg:text-6xl tracking-[1.8rem] lg:tracking-[1rem] sm:tracking-[0.5rem] sm:text-xl md:text-xl w-1/2"
            >
              {`L I F E`}
            </h1>
            <h1
              style={{
                animation: "fadeIn 2s ease-in-out forwards",
              }}
              className=" text-9xl lg:text-6xl tracking-[1.8rem] lg:tracking-[1rem] sm:tracking-[0.5rem] sm:text-xl md:text-xl w-1/2"
            >
              {`T I M E`}
            </h1>
          </div>

          {/* Star */}
          <div className="absolute top-1/2 left-1/2 flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 text-center text-white w-full">
            <img
              src={Star.src}
              alt="Star"
              className="w-full animate-pulse"
              style={{
                animation: "fadeInOut 4s ease-in-out infinite",
              }}
            />
          </div>
        </div>
        <div className=" w-full flex m-auto items-center justify-center h-[100px]  text-center font-light">
          <div className="sm:max-w-[60%]">
            <div
              //   className="opacity-0"
              style={{ animation: "fadeIn 3s ease-in-out forwards" }}
            >
              <span className="text-[1.75rem] sm:[1.5rem] font-light italic sm:text-[1.5rem] leading-[2.125rem] tracking-[2%]">
                Chain Nurturing
              </span>
              {` — `}
              <span className="text-[1.75rem] sm:[1.5rem] font-semibold sm:text-[1.5rem] leading-[2.125rem] tracking-[2%]">
                The Future of Life{" "}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="hidden sm:block md:block ">
        <div
          id="section1"
          className={clsx(
            "relative w-full min-h-[calc(60vh)] overflow-hidden px-14 ",
            className
          )}
        >
          <img
            src={Sky.src}
            alt="Sky background"
            className="absolute inset-0 w-full h-full object-cover object-bottom"
          />
          {/* Tree */}
          <div className="absolute w-[140%] -bottom-3 left-1/2 transform -translate-x-1/2">
            <div>
              <img
                src={TreeImage.src}
                alt="Tree"
                className="w-full "
                //   style={{
                //     transform: `translateY(${
                //       scrollProgress * scrollDistance
                //     }px) scale(${1 + scrollProgress})`,
                //   }}
              />
              <div className="absolute bottom-1/3 flex m-auto items-center justify-center inset-x-0  text-center text-white w-full">
                <h1
                  style={{
                    animation: "fadeIn 2s ease-in-out forwards",
                  }}
                  className="text-center  tracking-[0.5rem] sm:text-2xl md:text-xl w-1/3"
                >
                  {`L I F E`}
                </h1>
                <h1
                  style={{
                    animation: "fadeIn 2s ease-in-out forwards",
                  }}
                  className=" tracking-[0.5rem] sm:text-2xl md:text-xl w-1/3"
                >
                  {`T I M E`}
                </h1>
              </div>
            </div>
          </div>

          {/* Grass */}
          <div className="absolute w-full bottom-0  left-1/2  transform -translate-x-1/2">
            <img
              src={Grass.src}
              alt="Grass"
              className="w-full"
              //   style={{
              //     transform: `translateY(${scrollProgress * scrollDistance}px)`,
              //   }}
            />
          </div>

          {/* Star */}
          <div className="absolute top-1/2 left-1/2 flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 text-center text-white w-full">
            <img
              src={Star.src}
              alt="Star"
              className="w-full animate-pulse"
              style={{
                animation: "fadeInOut 4s ease-in-out infinite",
              }}
            />
          </div>
        </div>

        <div className="sm:px-[20px] bg-black w-full flex m-auto items-center justify-center  min-h-[30vh]  text-center font-light">
          <div className="">
            <div
              // className="opacity-0"
              style={{ animation: "fadeIn 3s ease-in-out forwards" }}
            >
              <span className=" font-light italic text-[1.2rem] leading-[2.125rem] tracking-[2%]">
                Chain Nurturing
              </span>
              {` — `}
              <span className=" font-semibold text-[1.2rem] leading-[2.125rem] tracking-[2%]">
                The Future of Life{" "}
              </span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInOut {
          0%,
          100% {
            opacity: 0.4;
          }
          50% {
            opacity: 1;
          }
        }
        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
};

export default Section1;
