//to inform next js this is a client component
"use client";

import styles from "./page.module.css";
import Chart from "chart.js/auto";
import { CategoryScale, Colors } from "chart.js";
import { useEffect, useState } from "react";
import Profile from "./components/Profile";
import ShiftData from "./components/ShiftData";
import MachineStats from "./components/MachineStats";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { machineSelector } from "@/lib/features/machinesSlice";
import { useSearchParams } from "next/navigation";
import { retrieveOpsumData, retrieveSensorData } from "@/app/utils/apiCalls";
import { initializeData } from "@/lib/features/dataStorageSlice";
import { initializeSensorData } from "@/lib/features/sensorDataStorageSlice";
import SplashScreen from "@/app/utils/splashScreen";

Chart.register(Colors, CategoryScale);
var navbar = {
    Profile: false,
    ShiftData: false,
    MachineStats: false,
    Reports: false
}


export default function Home() {

    const [loading, setLoading] = useState(true);
    const searchParams = useSearchParams();
    const dispatch = useAppDispatch();
    const id = searchParams.get("machine");

    const machines = useAppSelector(machineSelector);
    const machine = machines[id - 1];

    useEffect( () => {
        if (machine) {
            setLoading(false);
        }
    }, [machine]);

    retrieveOpsumData(dispatch, initializeData, 'all', id);
    retrieveSensorData(dispatch, initializeSensorData, 'all', id);

    const [clicked, setClicked] = useState(
        {
            Profile: true,
            ShiftData: false,
            MachineStats: false,
            Reports: false
        }
    );
    const handleClick = (btnName) => {
        var tempStore = { ...navbar, [btnName]: true };
        setClicked({ ...tempStore });
        console.log(tempStore);
    }

    if (loading) {
        return <SplashScreen />
    }
    else {

        return (
            <div className={styles.page}>
                <main className={styles.main}>
                    <div className={styles.mainContainer}>
                        <div className={styles.mainContent}>
                            <h2 style={{ color: "#fff", margin: "10px" }}>{machine.fleet_number} {machine.machine_type}</h2>
                            <div className={styles.tile}>
                                <nav className={styles.tileNavigation}>
                                    <button 
                                        className={`${styles.navButton} ${clicked.Profile ? styles.activeNavButton : ''}`} 
                                        onClick={() => handleClick("Profile")}
                                    >
                                        Profile
                                    </button>
                                    <button 
                                        className={`${styles.navButton} ${clicked.ShiftData ? styles.activeNavButton : ''}`}
                                        onClick={() => handleClick("ShiftData")}
                                    >
                                        Shift Data
                                    </button>
                                    <button 
                                        className={`${styles.navButton} ${clicked.MachineStats ? styles.activeNavButton : ''}`}
                                        onClick={() => handleClick("MachineStats")}
                                    >
                                        Statistics
                                    </button>
                                    <button 
                                        className={`${styles.navButton} ${clicked.Reports ? styles.activeNavButton : ''}`}
                                        onClick={() => handleClick("Reports")}
                                    >
                                        Reports
                                    </button>
                                </nav>
                                {clicked.Profile && <Profile machineID={id} />}
                                {clicked.ShiftData && <ShiftData />}
                            </div>
                        </div>
                    </div>
                </main>
                <footer className={styles.footer}>
                    <span className={styles.footerText}>© 2024 Mine Machines</span>
                </footer>
            </div>
        );
    }
}


