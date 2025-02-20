/* eslint-disable @next/next/no-img-element */
"use client";
import clsx from "clsx";
import Carousel from "@/app/components/Carousel";
import NutureLife1 from "@/public/images/nutureLife1.png";
import NutureLife2 from "@/public/images/nutureLife2.png";
import NutureLife3 from "@/public/images/nutureLife3.png";
import { useEffect, useRef } from "react";

const Section6 = ({ className }: { className?: string }) => {
  const sectionContent = [
    {
      img: NutureLife1.src,
      title: "Mint Your LifeTree",
      description:
        "First, mint your LifeTree and prepare to sprout to embark on your unique journey.",
    },
    {
      img: NutureLife2.src,
      title: "Sprout Your LifeTree",
      description:
        "After sprouting, your LifeTree will have a one-of-a-kind appearance, but it must be watered at least once every seven days to survive. The frequency of watering will also shape its unique look.",
    },
    {
      img: NutureLife3.src,
      title: "Inscribe Your LifeTree",
      description:
        "After two months, your unique LifeTree will enter an immortal state, no longer needing water. Finally, engrave your name on the tree, leaving your achievement permanently on the blockchain!",
    },
  ];

  const refs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = refs.current.indexOf(entry.target as HTMLDivElement);
            if (index !== -1) {
              const target = entry.target as HTMLElement;
              target.classList.add("animate-fadeInLeft");
              target.style.animationDelay = `${index * 500}ms`;
              observer.unobserve(entry.target); // Unobserve once the animation has been triggered
            }
          }
        });
      },
      {
        threshold: 0.1, // Adjust this based on when you want the animation to trigger
      }
    );

    refs.current.forEach((ref) => observer.observe(ref));

    return () => {
      observer.disconnect();
    };
  }, []);

  const renderContentDesktop = () => {
    return sectionContent.map((content, index) => (
      <div
        key={index}
        ref={(el) => {
          if (el) refs.current[index] = el;
        }}
        className={clsx(
          "flex-1 items-center justify-center bg-[#191919] rounded-lg text-center min-h-[450px] min-w-[380px] sm:min-w-[100%] md:min-w-[100%] sm:min-h-[100%] md:min-h-[100%]",
          "opacity-0"
          // Hide initially, the animation will fade it in
        )}
      >
        <div className=" min-h-[128px] mt-[56px] flex m-auto items-center mb-4 justify-center">
          <img src={content.img} alt={content.title} />
        </div>
        <h3
          className="text-lg font-semibold text-[22px] py-[38px]"
          style={{ lineHeight: "29px", letterSpacing: "2%" }}
        >
          {content.title}
        </h3>
        <div className="w-full flex m-auto items-center justify-center">
          <p
            className="text-[#C1C1C1] leading-6 text-base max-w-[280px] pb-[53px]"
            style={{ lineHeight: "24px" }}
          >
            {content.description}
          </p>
        </div>
      </div>
    ));
  };
  const renderContent = () => {
    return sectionContent.map((content, index) => (
      <div
        key={index}
        className="flex-1 items-center justify-center bg-[#191919] rounded-lg text-center min-h-[450px] min-w-[380px] sm:min-w-[100%] sm:min-h-[100%] md:min-w-[100%] md:min-h-[100%]"
      >
        <div className="min-h-[128px] mt-[56px] flex m-auto items-center mb-4 justify-center">
          <img src={content.img} />
        </div>
        <h3
          className="text-lg font-semibold text-[26px] py-[38px]"
          style={{ lineHeight: "60px" }}
        >
          {content.title}
        </h3>
        <div className="w-full flex m-auto items-center justify-center">
          <p className="text-[#C1C1C1] leading-6 text-base max-w-[280px] pb-[53px]">
            {content.description}
          </p>
        </div>
      </div>
    ));
  };

  return (
    <>
      {/* desktop */}
      <section
        className={clsx(
          "sm:hidden md:hidden flex flex-col  items-center gap-10 sm:gap-10 justify-center  bg-black text-white",
          className // This will allow custom classes to be added to the component
        )}
      >
        <h2
          className="text-center text-[46px] font-light italic mb-8"
          style={{ lineHeight: "55px" }}
        >
          Nurture
          <span className="font-semibold"> a Life</span>
        </h2>
        <div className="flex  justify-center gap-8">
          {renderContentDesktop()}
        </div>
      </section>
      {/* mobile */}
      <section
        className={clsx(
          "hidden sm:flex md:flex mt-5 flex-col  w-auto",
          className
        )}
      >
        <Carousel>{renderContent()}</Carousel>
      </section>
    </>
  );
};

export default Section6;
