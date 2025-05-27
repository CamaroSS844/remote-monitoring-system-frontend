//to inform next js this is a client component
"use client";

import styles from "./page.module.css";
import Chart from "chart.js/auto";
import { CategoryScale, Colors } from "chart.js";
import { useEffect, useState, Suspense } from "react";
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

// Client Component that uses useSearchParams
function MachineProfileContent() {
    const searchParams = useSearchParams();
    const dispatch = useAppDispatch();
    const id = searchParams.get("machine");
    const machines = useAppSelector(machineSelector);
    const machine = machines[id - 1];
    const [loading, setLoading] = useState(true);
    const [clicked, setClicked] = useState({
        Profile: true,
        ShiftData: false,
        MachineStats: false,
        Reports: false
    });

    useEffect(() => {
        if (machine) {
            setLoading(false);
        }
    }, [machine]);

    useEffect(() => {
        retrieveOpsumData(dispatch, initializeData, 'all', id);
        retrieveSensorData(dispatch, initializeSensorData, 'all', id);
    }, [dispatch, id]);

    const handleClick = (btnName) => {
        setClicked(prev => {
            const newState = {
                Profile: false,
                ShiftData: false,
                MachineStats: false,
                Reports: false
            };
            return { ...newState, [btnName]: true };
        });
    };

    if (loading) {
        return <SplashScreen />;
    }

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
                            <div className={styles.content}>
                                {clicked.Profile && <Profile machineID={id} />}
                                {clicked.ShiftData && <ShiftData />}
                                {clicked.MachineStats && <MachineStats />}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

// Wrap the component that uses useSearchParams in Suspense
export default function Home() {
    return (
        <Suspense fallback={<SplashScreen />}>
            <MachineProfileContent />
        </Suspense>
    );
}


