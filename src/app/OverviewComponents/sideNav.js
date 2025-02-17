import Image from "next/image";
import Link from "next/link";
import styles from "../page.module.css";
import { useState } from "react";

export default function SideNav() {
  const [screen, setScreen] = useState("overview");//overview, machines, reports, settings, help


  return (
    <div
      className={styles.sideNav}
    >
      <Link
        className={ /*remove repetition by creating custom function*/screen == "overview" ?`${styles.sideNavLink} ${styles.active}`: styles.sideNavLink}
        href="/"
        onClick={() => setScreen("overview")}
      >
        <Image src="/home.svg" alt="home icon" width={20} height={20} priority />
        <span>Overview</span>
      </Link>

      <Link
        className={screen == "machines" ?`${styles.sideNavLink} ${styles.active}`: styles.sideNavLink}
        href="/Machines"
        onClick={() => setScreen("machines")}
      >
        <Image
          src="/dump-truck-svgrepo-com (1).svg"
          alt="notifications icon"
          width={20}
          height={20}
          priority
        />
        <span>Machines</span>
      </Link>

      <Link
        className={screen == "reports" ?`${styles.sideNavLink} ${styles.active}`: styles.sideNavLink}
        href="/Archive"
        onClick={() => setScreen("reports")}
      >
        <Image
          src="/noun-archive-131575.svg"
          alt="reports icon"
          width={25}
          height={25}
          priority
        />
        <span >Archive</span>
      </Link>

      <div
        style={{
          width: "100%",
          height: "1px",
          backgroundColor: "#e0e0e0",
          margin: "8px 0",
        }}
      />

      <Link
        className={screen == "settings" ?`${styles.sideNavLink} ${styles.active}`: styles.sideNavLink}
        href="/#"
        onClick={() => setScreen("settings")}
      >
        <Image
          src="/settings.svg"
          alt="settings icon"
          width={20}
          height={20}
          priority
        />
        <span>Settings</span>
      </Link>

      <Link
        className={screen == "help" ?`${styles.sideNavLink} ${styles.active}`: styles.sideNavLink}
        href="/#"
        onClick={() => setScreen("help")}
      >
        <Image
          src="/question.svg"
          alt="help icon"
          width={20}
          height={20}
          priority
        />
        <span>Help</span>
      </Link>
    </div>
  );
}
