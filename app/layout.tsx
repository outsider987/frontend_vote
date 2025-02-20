import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./layouts/Header"; // Fixed the typo from Hedaer to Header
import RootContextProvider from "./store";
import clsx from "clsx";
import NavBar from "./layouts/NavBar";
import MyWagmiProvider from "./Provide/MyWagmiProvider";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LIFETIME",
  description:
    "LIFETIME is a life imagination DApp that allows users to create and nurture virtual life forms on the blockchain.",
  metadataBase: new URL("https://lifetime.cx"), // Replace with your actual domain
  openGraph: {
    images: [
      {
        url: "/thumbnail2.png",
        width: 800,
        height: 450,
        alt: "Logo",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js"></script>
        <script src="https://unpkg.com/p5.js-svg@1.5.1"></script>
      </head>
      <MyWagmiProvider>
        <RootContextProvider>
          <body
            suppressHydrationWarning
            className={clsx(inter.className, "h-[100dvh]")}
          >
            {/* <Header className="z-20" /> */}
            <NavBar className={"z-20"} />
            <div className="w-full overflow-x-hidden max-w-[1920px] mx-auto min-h-[100dvh] ">
              {children}
            </div>
          </body>
        </RootContextProvider>
      </MyWagmiProvider>
    </html>
  );
}
