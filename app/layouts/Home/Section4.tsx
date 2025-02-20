/* eslint-disable @next/next/no-img-element */
import clsx from "clsx";
import TreeGif from "@/app/assets/gif/tree.gif";

const Section4 = ({ className }: { className?: string }) => {
  return (
    <div
      className={clsx(
        "flex w-full md:flex-col  items-center sm:flex-col-reverse  sm:gap-10 justify-between  bg-black text-white",
        className // This will allow custom classes to be added to the component
      )}
    >
      <div className=" mt-8 w-1/2 sm:w-full md:w-full">
        <div className="max-w-[417px] ">
          <h1 className="text-[46px] sm:text-[32px] md:text-[32px] italic font-light leading-[55px] sm:max-w-[300px] tracking-[2px]">
            Dynamic{" "}
            <span className="font-semibold leading-[55px] tracking-[2px]">
              Growth and Interaction
            </span>
          </h1>
          <p className="mt-6 text-base sm:text-[14px] md:text-[14px] leading-6 text-[#C1C1C1]">
            Through {`"chain nurturing"`}, users can experience the freedom of
            creating and managing virtual life afforded by blockchain
            technology, immersing themselves in the virtual world and enjoying
            the surprises and discoveries that each interaction brings.
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-br flex m-auto items-center justify-center w-1/2 sm:w-full md:w-full from-blue-400 to-purple-600  ">
        <video
          autoPlay
          loop
          muted
          className="w-full h-full object-cover rounded-2xl"
          src={
            "https://turquoise-rapid-marmot-585.mypinata.cloud/ipfs/QmWi7XFeVzKzLwbVujiRAWVP8RJYAFbcLYpDw8QmRe2SaE/tree.mp4"
          }
        ></video>
        {/* <img
          src={TreeGif.src}
          alt="section4-bg"
          className="rounded-2xl w-full max-w-[600px] "
        /> */}
      </div>
    </div>
  );
};

export default Section4;
