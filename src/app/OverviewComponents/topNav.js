import Image from "next/image";
import styles from "../page.module.css";
import Link from "next/link";
import NotificationDropdown from "./dropdownComponent";
import AccountDropdown from "./accountManagement";

export default function TopNav({ setpopUpVisibility }) {

  return (
    <header className={styles.header}>
      <div style={{ display: "flex", flexDirection: "row", height: "100%", justifyContent: "center", alignItems: "center", gap: "10px" }}>
        <Image
          className={styles.logo}
          src="/w112.png"
          alt="Next.js logo"
          width={250}
          height={40}
          priority
        /> 
      </div>
      <div className={styles.navbar}>
        <NotificationDropdown />
        <div
          className={styles.navAnchor}
          onClick={() => setpopUpVisibility(true)}
        >
          <span>
            <h4>Mimosa Mine</h4>
            <span>Zimbabwe</span>
          </span>
          <Image
            src="/building.svg"
            alt="notifications icon"
            width={40}
            height={50}
            priority
          />
          </div>
          <AccountDropdown />
      </div>
    </header>
  )
}