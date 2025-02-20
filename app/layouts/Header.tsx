/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import Button from "../components/Button";
import { useWalletContext } from "../store/Wallet";
import TitleImage from "@/public/svgs/title.svg";
import TitleImageMobile from "@/public/logo.png";
import WalletSvgIcon from "@/public/svgs/wallet.svg";
import { useRouter, usePathname } from "next/navigation";
import Modal from "../components/Modal";
import Metamask from "@/public/images/meta-mask.png";
import Menu from "../components/Menu";
import { isMobileDevice } from "../utils/deviceDetector";

const Header = ({ className, ...props }) => {
  const {
    connect,
    address,
    isConnected,
    connectionStatus,
    connectionError,
    isConnecting,
  } = useWalletContext();

  const pathname = usePathname() || null;
  const [show, setShow] = useState(false);
  const router = useRouter();
  const [showMobileWarning, setShowMobileWarning] = useState(false);

  useEffect(() => {
    const handleAsyncConnect = async () => {
      if (pathname === "/connect" && !isConnected) {
        await handleConnect();
      }
    };

    handleAsyncConnect();
  }, [pathname]);

  // Function to truncate address for display
  const truncateAddress = (address: string) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const handleConnect = async () => {
    try {
      if (isMobileDevice()) {
        setShowMobileWarning(true);
        return;
      }

      if (pathname === "/") {
        router.push("/connect");
      } else {
        setShow(true);
        await connect();
      }
    } catch (error) {
      console.error("Failed to connect:", error);
    }
  };

  useEffect(() => {
    // If there's an address but not connected, try to connect
    const autoConnect = async () => {
      if (address && !isConnected && !isConnecting) {
        try {
          await connect();
        } catch (error) {
          console.error("Auto-connect failed:", error);
        }
      }
    };

    autoConnect();
  }, [address, isConnecting, connect]);

  useEffect(() => {
    if (isConnected) {
      setShow(false);
    }
  }, [isConnected]);

  const getButtonContent = () => {
    if (isConnecting)
      return (
        <div className="flex items-center ml-5">
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Connecting...
        </div>
      );
    if (connectionStatus === "error") return "Connection Failed";
    if (pathname === "/") return "Launch DApp";
    return "Connect";
  };

  return (
    <>
      <header
        className={`flex items-center justify-between opacity-100 h-[86px] sm:h-[64px] md:h-[64px] fixed left-0 right-0 top-0 z-10 px-12 sm:px-[18px] md:px-[18px] border-b border-solid border-[rgba(255,255,255,0.2)] ${className}`}
      >
        <div className="flex items-center gap-2">
          <a
            //   href="/"
            onClick={() => router.push("/")}
            className="cursor-pointer sm:w-[120px] md:w-[120px]  sm:h-3 md:h-3 "
          >
            <div className="w-[174px]  flex items-center justify-center sm:w-[120px] md:w-[120px] sm:h-3 md:h-3">
              <TitleImage className="w-full h-full" />
            </div>
            {/* <img className="" src={TitleImage.src} width={174} alt="Home" /> */}
          </a>
        </div>

        <div>
          <Button
            className="sm:w-[120px] md:w-[120px] sm:h-[30px] md:h-[30px] sm:text-sm md:text-sm h-[40px] w-[150px] !p-0"
            mode="primaryContained"
            onClick={handleConnect}
            disabled={isConnecting}
            rounded
          >
            {getButtonContent()}
          </Button>
        </div>
      </header>
    </>
  );
};

export default Header;
