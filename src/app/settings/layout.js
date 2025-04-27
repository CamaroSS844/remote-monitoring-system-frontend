"use client";

import localFont from "next/font/local";
import "./globals.css";
import StoreProvider from "../StoreProvider";
import Image from "next/image";
import { useState, useEffect } from "react";
import styles from "../page.module.css";

import TopNav from "../OverviewComponents/topNav";
import SideNav from "../OverviewComponents/sideNav";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});


export default function RootLayout({ children }) {
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [popUpVisibility, setpopUpVisibility] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
      <>
        <div style={{ width: "100vw", height: "100vh", position: "fixed", zIndex: -1 }}>
          <Image
            className={styles.backDrop}
            src="/slp8 background.png"
            alt="Background"
            width={windowDimensions.width}
            height={440}
            priority
          />
        </div>
        <TopNav setpopUpVisibility={setpopUpVisibility}/>
        <SideNav />
        <StoreProvider>
          {children}
        </StoreProvider>
      </>
  );
}
