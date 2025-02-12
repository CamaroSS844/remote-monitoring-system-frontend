//to inform next js this is a client component
"use client";

import styles from "./page.module.css";
// import Chart from "chart.js/auto";
// import { CategoryScale, Colors } from "chart.js";
import { useState, useEffect, useRef } from "react";
import { MSChart, TPHChart, NoCChart, TTChart, MileageChart } from "./utils/dataSortingApi";
import PieChart from "./OverviewComponents/PieChart";
import { BarChart } from "./OverviewComponents/BarChart";

import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, ArcElement, BarElement } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, ArcElement, BarElement);



import { retrieveData, retrieveKPIs } from "./utils/apiCalls";
import { initialize } from "@/lib/features/machinesSlice";
import { initializeKPIs } from "@/lib/features/kpiSlice";
import { useAppDispatch } from "@/lib/hooks";


// Chart.register(Colors, CategoryScale);


export default function Home() {
  const dispatch = useAppDispatch();

  const segmentRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      {
        threshold: 0.5, // Trigger when 50% of the element is visible
      }
    );

    if (segmentRef.current) {
      observer.observe(segmentRef.current);
    }

    return () => {
      if (segmentRef.current) {
        observer.unobserve(segmentRef.current);
      }
    };
  }, []);



  useEffect(() => {
    retrieveData(dispatch, initialize).then(() => {
      console.log("Data fetched and initialized.");
    });
    retrieveKPIs(dispatch, initializeKPIs, 1).then(() => {
      console.log("KPIs fetched and received successfully")
    })
  }, [dispatch]);

  const [tonnagePHchart, settonnagePH] = useState({ ...TPHChart });
  const [machineStatus, setMachineStatus] = useState({
    labels: ["Active", "Inactive", "Offline"],
    datasets: [
      {
        data: [3, 1, 1],
        backgroundColor: [
          "#3CC3DF",
          "#FFAE4C",
          "#FF928A",
        ],
        borderWidth: 0,
        cutout: "80%",
        borderRadius: 90,
        width: 70,
        spacing: -10,
      },
    ],
  });

  const [numberofCycles, setnumberofCycles] = useState({ ...NoCChart });


  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.mainContainer}>
          <div className={styles.mainContent}>
            <div>
              <span className={styles.mainHeading}>Fleet Peformance Overview</span>
              <div className={styles.App}>
                <div className={styles.summaryTilesContainer}>
                  <div className={styles.summaryTile}>
                    <span style={{ fontSize: "0.9em", fontWeight: "bold", marginBottom: "10px" }}>Total Active Machines</span>
                    <h2>5</h2>
                    <span style={{ fontSize: "0.8em", marginTop: "10px" }}>+1 from yesterday</span>
                  </div>
                  <div className={styles.summaryTile}>
                    <span style={{ fontSize: "0.9em", fontWeight: "bold", marginBottom: "10px" }}>Total Tonnage (Today)</span>
                    <h2>245 tons</h2>
                    <span style={{ fontSize: "0.8em", marginTop: "10px" }}>+16% from yesterday</span>
                  </div>
                  <div className={styles.summaryTile}>
                    <span style={{ fontSize: "0.9em", fontWeight: "bold", marginBottom: "10px" }}>Fuel Consumed (Today)</span>
                    <h2>1254 L</h2>
                    <span style={{ fontSize: "0.8em", marginTop: "10px" }}>+2% from yesterday</span>
                  </div>
                  <div className={styles.summaryTile}>
                    <span style={{ fontSize: "0.9em", fontWeight: "bold", marginBottom: "10px" }}>Active Violations</span>
                    <h2>3</h2>
                    <span style={{ fontSize: "0.8em", marginTop: "10px" }}>-2 from yesterday</span>
                  </div>

                </div>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", margin: "20px 0 0 0" }}>
                  <div id={styles.Machine_Status} className={styles.scroll_segment}>
                    <h2>Machine Status</h2>
                    <PieChart chartData={machineStatus} />
                    <div style={{ marginTop: "30px" }}>
                      <p>
                        Out of a <b>total of 5</b> machines, 
                        <b>3</b>  are currently active,
                        1 is/are inactive, and 1 is/are offline.
                        Active machines are those whose data is upto date,
                        inactive are those whose data is off by 2 days, 
                        and offline trucks are behind by more than 2 days.
                      </p>
                    </div>
                  </div>
                  <div id={"Productivity"} className={styles.scroll_segment} >
                    <h2>Productivity</h2>
                    <BarChart chartData={numberofCycles} label={"Tonnage/machine"} />
                    <p>
                      This graph compares the tonnage hauled by each truck today against the daily target of 15 tons. Trucks exceeding the target are performing well, while those below may need attention or have had fewer assignments.
                    </p>
                  </div>
                </div>
                <div style={{ display: "flex", width: "100%", flexDirection: "row", justifyContent: "space-evenly", margin: "20px 0 0 0" }}>
                  <div id={"Fuel Consumed"} className={styles.scroll_segment} >
                    <h2>Fuel Consumed</h2>
                    <BarChart chartData={numberofCycles} label={"Fuel Consumed/machine"} />
                    <p>
                      This graph shows the overall performance score of each truck compared to the fleet average of 
                      85%. The performance score is calculated based on factors such as tonnage hauled, fuel efficiency, 
                      and maintenance history. Trucks performing above average are excelling, while those below may need 
                      attention or optimization.
                    </p>
                  </div>
                  <div id={"Fuel Consumed"} className={styles.scroll_segment} style={{ height: "300px" }}>
                    <h2>Recent Events</h2>
                    <ul>
                      <li>Violations noted from LHD 141</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className={styles.footer}>
        <span className={styles.footerText}>© 2025 Mine Machines</span>
      </footer>
    </div>
  );
}


const style = {
  summaryTilesContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    margin: "20px 0 0 0"
  },
  summaryTile: {
    backgroundColor: "#fff",
    padding: "20px",
    textAlign: "left",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
  },
}


