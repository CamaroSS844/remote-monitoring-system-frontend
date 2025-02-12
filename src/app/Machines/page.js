//to inform next js this is a client component
"use client";

import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import { useAppSelector } from "@/lib/hooks";
import { machineSelector } from "@/lib/features/machinesSlice";


export default function MachineListPage() {
  const machines = useAppSelector(machineSelector);


  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.mainContainer}>
          <div className={styles.mainContent}>
            <div className={styles.tileContainer}>
              {machines.map((machine) => (
                <Link
                  href={{
                    pathname: "/Machines/MachineProfile",
                    query: { machine: machine.id },
                  }}
                  className={styles.tile}
                  key={machine.id}
                >
                  <Image
                    className={styles.tileIcon}
                    src="/slp8 icon 2.png"
                    alt="SLP8 icon"
                    width={120}
                    height={65}
                    priority
                  />
                  <h2 >{machine.id_number}</h2>
                  see more
                </Link>
              ))}
              <div className={styles.tile}>
                <span style={{ fontSize: "7em" }}> + </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
