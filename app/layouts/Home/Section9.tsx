/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import OpenSea from "@/public/svgs/opensea.svg";
import clsx from "clsx";
import Button from "@/app/components/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Logo from "@/public/svgs/logo.svg";
import CommingModal from "@/app/components/Modal/Comming";

const Section9 = ({ className }: { className?: string }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isCommingVisible, setIsCommingVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

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
    <div
      className={clsx(" w-full sm:h-auto m-auto flex items-center", className)}
    >
      <div className="grid grid-cols-10 sm:flex sm:flex-col  rounded-xl bg-[#191919]  py-[50px] px-[64px] sm:px-6 h-2/3 sm:h-full">
        <div className="sm:text-[32px] md:text-[32px] col-span-4 text-[55px] font-semibold text-center sm:pb-4 leading-[55px] tracking-[2%]">
          Market <span className=" font-light italic">Place</span>
        </div>
        <div className="col-span-6 flex flex-col gap-3">
          <div className="leading-[24px] text-[16px] w-full">
            Lootex is a user-centric, multi-chain digital asset marketplace that
            not only facilitates NFT transactions but also provides up-to-date
            information on the latest projects.
          </div>
          <div className="flex items-center mt-[42px] gap-6">
            <Button
              mode="primaryContained"
              className="flex items-center h-[55px]"
              rounded
              onClick={() => {
                window.open(
                  "https://lootex.io/collections/base:0xc28b845e232f50aab30cff1909af3f169edd02b1",
                  "_blank"
                );
              }}
            >
              <Logo className="w-[32px] h-[32px] mr-2" />
              GO TO LOOTEX <ArrowForwardIcon className="ml-2" />
            </Button>
            <a
              href="https://opensea.io/collection/lifetime-access-pass"
              target="_blank"
            >
              <OpenSea className="w-[55px] h-[55px]" />
            </a>
          </div>
        </div>
      </div>
      <CommingModal show={isCommingVisible} setShow={setIsCommingVisible} />
    </div>
  );
};

export default Section9;
