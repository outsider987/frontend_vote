/* eslint-disable @next/next/no-img-element */
"use client";
import clsx from "clsx";
import Gallery1 from "@/public/images/Home/web-01.png";
import Gallery2 from "@/public/images/Home/web-02.png";
import Gallery3 from "@/public/images/Home/web-03.png";
import Gallery4 from "@/public/images/Home/web-04.png";
import Gallery5 from "@/public/images/Home/web-05.png";
import Gallery6 from "@/public/images/Home/web-06.png";
import Carousel from "@/app/components/Carousel";

const Section7 = ({ className }: { className?: string }) => {
  const baseUrl =
    "https://turquoise-rapid-marmot-585.mypinata.cloud/ipfs/QmWi7XFeVzKzLwbVujiRAWVP8RJYAFbcLYpDw8QmRe2SaE/";
  const images = [
    {
      src: `${baseUrl}1.png`,
      alt: "Tree 1",
      colSpan: "col-span-3",
      rowSpan: "row-span-1",
    },
    {
      src: `${baseUrl}2.png`,
      alt: "Tree 2",
      colSpan: "col-span-5",
      rowSpan: "row-span-1",
    },
    {
      src: "",
      alt: "",
      colSpan: "col-span-1",
      rowSpan: "row-span-1",
    },
    {
      src: `${baseUrl}3.png`,
      alt: "Tree 3",
      colSpan: "col-span-4",
      rowSpan: "row-span-1",
    },
    {
      src: `${baseUrl}4.png`,
      alt: "Tree 4",
      colSpan: "col-span-3",
      rowSpan: "row-span-1",
    },
    {
      src: `${baseUrl}5.png`,
      alt: "Tree 5",
      colSpan: "col-span-4",
      rowSpan: "row-span-1",
    },
  ];

  const mobileImages = [
    {
      src: `${baseUrl}1.png`,
      alt: "Tree 1",
    },
    {
      src: `${baseUrl}2.png`,
      alt: "Tree 2",
    },
    {
      src: `${baseUrl}3.png`,
      alt: "Tree 3",
    },
    {
      src: `${baseUrl}4.png`,
      alt: "Tree 4",
    },
    {
      src: `${baseUrl}5.png`,
      alt: "Tree 5",
    },
    {
      src: `${baseUrl}6.png`,
      alt: "Tree 6",
    },
  ];

  return (
    <>
      <section
        className={clsx(
          "sm:hidden md:hidden  w-full  bg-black grid grid-rows-3 items-center justify-center ",
          className // This will allow custom classes to be added to the component
        )}
      >
        <div className="grid grid-cols-12 gap-6 row-span-2">
          {images.map((image, index) => (
            <div key={index} className={`${image.colSpan} ${image.rowSpan}`}>
              {image.src && (
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full rounded-3xl object-cover"
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-evenly items-center w-full row-span-1">
          <div className="flex justify-end max-w-[450px] ">
            {/* <img src={Gallery6.src} alt="Tree 6" className="rounded-2xl" /> */}
            <img src={`${baseUrl}6.png`} alt="Tree 6" className="rounded-2xl" />
          </div>
          <div className="flex flex-col justify-end mb-8">
            <h1
              className="text-white text-5xl font-semibold mb-8 tracking-[2px]"
              style={{ lineHeight: "55px", letterSpacing: "2%" }}
            >
              LifeTrees{" "}
              <span className="font-light italic tracking-[2px]"> Gallery</span>
            </h1>
            <p className="text-[#C1C1C1] text-base max-w-[417px] leading-[24px]">
              Explore the diverse and vibrant LifeTrees, growing and changing
              with time and user interaction.
            </p>
          </div>
        </div>
      </section>
      <section
        className={clsx(
          " hidden sm:flex md:flex mt-5 flex-col  w-auto ",
          className
        )}
      >
        <Carousel images={mobileImages.map((image) => image.src)}></Carousel>
        <div className="flex-1 flex flex-col my-8">
          <h1 className="text-white text-5xl font-bold mb-8 tracking-[2px]">
            LifeTrees{" "}
            <span className="font-light italic tracking-[2px]"> Gallery</span>
          </h1>
          <p className="text-[#C1C1C1] text-base  max-w-[417px]">
            Explore the diverse and vibrant LifeTrees, growing and changing with
            time and user interaction.
          </p>
        </div>
      </section>
    </>
  );
};

export default Section7;
