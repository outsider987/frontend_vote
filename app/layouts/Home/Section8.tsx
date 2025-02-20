/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import TreeImage from "@/public/images/Tree.webp";
import Grass from "@/public/images/Grass.webp";
import Sky from "@/public/images/Sky.webp";
import Sky2 from "@/public/images/Home/Sky_2.webp";
import Moon from "@/public/images/Home/Moon.webp";
import Star from "@/public/images/Star.webp";
import Flower from "@/public/images/Home/Leaves.webp";
import clsx from "clsx";
import Button from "@/app/components/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CommingModal from "@/app/components/Modal/Comming";

const Section8 = ({ className }: { className?: string }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isCommingVisible, setIsCommingVisible] = useState(false);

  useEffect(() => {
    const sectionRef = document.querySelector("#section8");

    const handleScroll = () => {
      if (!sectionRef) return;
      const rect = sectionRef.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate the scroll progress
      const progress = Math.min(
        Math.max((windowHeight - rect.top) / windowHeight, 0),
        1
      );
      setScrollProgress(progress);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting) {
          window.addEventListener("scroll", handleScroll);
        } else {
          window.removeEventListener("scroll", handleScroll);
        }
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

  const scrollY = scrollProgress; // Adjust this value as needed
  const scale = 0.5 + scrollProgress * 0.5; // Adjust this value as needed

  const starOpacity = 1 - scrollProgress; // Adjust this value as needed
  const backgroundOpacity = 1 - scrollProgress * 0.8; // Adjust this value as needed
  const treeScale = 0.5 + scrollProgress * 0.5; // Adjust this value as needed
  const scrollText = scrollProgress * 400;
  return (
    <>
      <CommingModal show={isCommingVisible} setShow={setIsCommingVisible} />
      <div className="my-10 w-full">
        <div
          className={clsx(
            "bg-gradient-to-t sm:py-0 from-[#050508] py-10 to-transparent pointer-events-nonepy-10  top-1/2 left-1/2 flex items-center justify-center transform  text-center text-white w-full"
          )}
        >
          <h1
            style={{
              opacity: scrollProgress,
              lineHeight: "60px",
              letterSpacing: "2%",
            }}
            className="text-5xl sm:text-[32px] md:text-xl w-1/2 font-light italic"
          >
            Begin <span className=" font-semibold">Your Journey</span>
          </h1>
        </div>

        <div
          id="section8"
          className={clsx(
            "min-h-[1080px] relative w-full sm:min-h-[55vh]",
            className
          )}
          style={{
            backgroundImage: `url(${Sky.src})`,
            backgroundSize: "cover",
            backgroundPosition: "bottom",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
          }}
        >
          {/* Background */}
          <img
            src={Sky2.src}
            alt="Sky"
            className="absolute w-full h-full bg-[#191919] inset-0"
          />
          <img
            src={Sky.src}
            alt="Sky"
            className="absolute w-full h-full bg-[#191919] inset-0"
            style={{ opacity: 1 - scrollProgress }}
          />

          {/* Moon */}
          <img
            src={Moon.src}
            alt="Moon"
            className="absolute  inset-0"
            // style={{ opacity: starOpacity + 0.4 }}
          />
          {/* Star */}
          <div className="absolute top-1/2 left-1/2 flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 text-center text-white w-full">
            <img
              src={Star.src}
              alt="Star"
              className="w-full"
              style={{ opacity: starOpacity + 0.4 }}
            />
          </div>

          {/* Tree */}
          <div className="absolute w-full bottom-0 left-1/2 transform -translate-x-1/2">
            <img
              src={TreeImage.src}
              alt="Tree"
              className=""
              //   style={{
              //     transform: `translateY(${scrollY * 2}%) scale(${treeScale})`,
              //   }}
            />
            {/* Flower */}
            <img
              src={Flower.src}
              alt="Flower"
              className="absolute w-full h-full inset-0"
              style={{
                opacity: 1 - starOpacity * 4,
                // transform: `translateY(${scrollY * 2}%) scale(${treeScale})`,
              }}
            />
          </div>

          {/* Grass */}
          <div className="absolute w-full bottom-0 left-1/2 transform -translate-x-1/2">
            <img
              src={Grass.src}
              alt="Grass"
              className="w-full"
              //   style={{ transform: `translateY(${scrollY}px) scale(${scale})` }}
            />
          </div>

          <div className="mt-4 w-full flex m-auto items-center justify-center text-center font-light absolute bottom-0 left-1/2 transform -translate-x-1/2">
            <div
              style={{ transform: `translateY(-${scrollY * 800}%)` }}
              className="sm:max-w-[60%] sm:hidden"
            >
              <span className="text-[18px] sm:text-[16px] ">
                <Button
                  mode="primaryContained"
                  rounded
                  className="flex items-center gap-2"
                  onClick={() => setIsCommingVisible(true)}
                >
                  GET STARTED <ArrowForwardIcon />
                </Button>
              </span>
            </div>
          </div>
        </div>
        <span className="text-[18px] bg-black sm:text-[16px] hidden sm:flex w-full  justify-center items-center">
          <Button
            mode="primaryOutline"
            rounded
            className="flex items-center gap-2"
            onClick={() => setIsCommingVisible(true)}
          >
            GET STARTED <ArrowForwardIcon />
          </Button>
        </span>
      </div>
    </>
  );
};

export default Section8;
