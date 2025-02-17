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
import Image from "next/image";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, ArcElement, BarElement);



import { retrieveData, retrieveKPIs, retrieveOpsumData, retrieveReportData } from "./utils/apiCalls";
import { initialize } from "@/lib/features/machinesSlice";
import { initializeKPIs } from "@/lib/features/kpiSlice";
import { useAppDispatch } from "@/lib/hooks";
import SplashScreen from "./utils/splashScreen";


// Chart.register(Colors, CategoryScale);


export default function Home() {
  const dispatch = useAppDispatch();
  const [reportData, setReportData] = useState({
    rawReportData: [],
    totalFuelConsumed: 0,
    totalTonnage: 0,
    totalViolations: 0
  })

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
    retrieveReportData().then(e => {
      if (reportData == null) {
        totalTonnage = 0;
        totalFuelConsumed = 0;
        e.map(i => {
          totalTonnage += i.tonnage;
          totalFuelConsumed += i.fuel_consumed;
        })

        setReportData({
          rawReportData: e,
          totalTonnage: totalTonnage,
          totalFuelConsumed: totalFuelConsumed,
          totalViolations: 0
        })

      } else {
        setReportData({ ...reportData, rawReportData: e })
      }
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

  if (reportData.rawReportData.length == 0) {
    return (
      <SplashScreen />
    )
  }
  else {
    return (
      <div className={styles.page}>
        <main className={styles.main}>
          <div className={styles.mainContainer}>
            <div className={styles.mainContent}>
              <div>
                <div style={{ display: "flex", flexDirection: "row", color: "#fff", marginTop: "5px" }}>
                  <div style={{ display: "flex", flexDirection: "column", width: "50%" }}>
                    <span className={styles.mainHeading}>Daily Peformance Report</span>
                    <span style={{ fontWeight: "lighter" }}>Generated at: 12/02/2025 08:00</span>
                  </div>
                  <div className={styles.filterBar}>
                    <div className={styles.filter}>
                      <Image
                        className={styles.graphIcon}
                        src="/graph.png"
                        alt="filter to see graph"
                        width={30}
                        height={200}
                        priority
                      />
                    </div>
                    <div className={styles.filter}>
                      <Image
                        className={styles.graphIcon}
                        src="/document.png"
                        alt="filter to see graph"
                        width={30}
                        height={200}
                        priority
                      />
                    </div>
                    <div className={styles.filter}>
                      <Image
                        className={styles.graphIcon}
                        src="/downloads.png"
                        alt="filter to see graph"
                        width={30}
                        height={200}
                        priority
                      />
                    </div>
                  </div>
                </div>
                <div className={styles.App}>
                  <div className={styles.summaryTilesContainer}>
                    <div className={styles.summaryTile}>
                      <span style={{ fontSize: "0.9em", fontWeight: "bold", marginBottom: "10px" }}>Total Active Machines</span>
                      <h2>{reportData.rawReportData.length}</h2>
                      <span style={{ fontSize: "0.8em", marginTop: "10px" }}>+1 from yesterday</span>
                    </div>
                    <div className={styles.summaryTile}>
                      <span style={{ fontSize: "0.9em", fontWeight: "bold", marginBottom: "10px" }}>Total Tonnage (Today)</span>
                      <h2>{reportData.totalTonnage} tons</h2>
                      <span style={{ fontSize: "0.8em", marginTop: "10px" }}>+16% from yesterday</span>
                    </div>
                    <div className={styles.summaryTile}>
                      <span style={{ fontSize: "0.9em", fontWeight: "bold", marginBottom: "10px" }}>Fuel Consumed (Today)</span>
                      <h2>{reportData.totalFuelConsumed} L</h2>
                      <span style={{ fontSize: "0.8em", marginTop: "10px" }}>+2% from yesterday</span>
                    </div>
                    <div className={styles.summaryTile}>
                      <span style={{ fontSize: "0.9em", fontWeight: "bold", marginBottom: "10px" }}>Active Violations</span>
                      <h2>{reportData.totalViolations}</h2>
                      <span style={{ fontSize: "0.8em", marginTop: "10px" }}>-2 from yesterday</span>
                    </div>

                  </div>
                  <div style={{ width: "90%", margin: "20px 0 0 0" }}>
                    <div className={styles.scroll_segment}>
                      <h2 style={{ marginBottom: "10px" }}>Vehicle Peformance Comparison</h2>
                      <div className={styles.productivity} style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>

                        <BarChart chartData={numberofCycles} label={"Tonnage/day"} />
                        <table className={styles.productivityTable}>
                          <tbody>
                            <tr >
                              <th>M. ID</th>
                              <th>Mileage (km)</th>
                              <th>Tonnage (t)</th>
                              <th>Fuel Consumed (L)</th>
                              <th>Viol</th>
                            </tr>
                            <tr className={styles.productTableRow} >
                              <td>LHD 141</td>
                              <td>0.00</td>
                              <td>0.00</td>
                              <td>0.00</td>
                              <td>0</td>
                            </tr>
                            <tr className={styles.productTableRow} >
                              <td>LHD 142</td>
                              <td>0.00</td>
                              <td>0.00</td>
                              <td>0.00</td>
                              <td>0</td>
                            </tr>
                            <tr className={styles.productTableRow} >
                              <td>LHD 143</td>
                              <td>0.00</td>
                              <td>0.00</td>
                              <td>0.00</td>
                              <td>0</td>
                            </tr>
                            <tr className={styles.productTableRow} >
                              <td>LHD 144</td>
                              <td>0.00</td>
                              <td>0.00</td>
                              <td>0.00</td>
                              <td>0</td>
                            </tr>
                            <tr className={styles.productTableRow} >
                              <td>LHD 145</td>
                              <td>0.00</td>
                              <td>0.00</td>
                              <td>0.00</td>
                              <td>0</td>
                            </tr>
                            {/*
                                        (state.currentData ?? []).map(e => {
                                            return (
                                                <tr key={e.id} className={(state.currentShift.id == e.id)? styles.activeProductTableRow :styles.productTableRow} onClick={() => handleRowClick(e)}>
                                                    <td>{formatDate(e.date)}</td>
                                                    <td>{e.shift_number}</td>
                                                    <td style={(kpis.tonnage_per_shift > e.tonnage) ? {color: "red"} : {color: "green"}}>{e.tonnage}</td>
                                                    <td style={(kpis.tonnage_per_shift > e.tonnage) ? {color: "red"} : {color: "green"}}>{(parseInt(e.tonnage) / 8).toFixed(2)}</td>
                                                    <td>{e.no_of_loads}</td>
                                                    <td style={{color: "green", fontStyle: "italic"}}>clear</td>
                                                </tr>
                                            )
                                        }) 
                          */}
                          </tbody>
                        </table>
                      </div>
                      <ul style={{ width: "100%", marginLeft: "40px" }}>
                        <b>Comments:</b>
                        <li>LHD 141 has the best efficiency</li>
                        <li>LHD 142 has improved the fuel efficiency</li>
                        <li>LHD 143 has improved the most violations and that should be reviewed</li>
                      </ul>
                    </div>
                  </div>

                  <div style={{ width: "90%", margin: "20px 0 0 0" }}>
                    <div className={styles.scroll_segment}>
                      <h2 style={{ marginBottom: "10px" }}>KPI Comparison</h2>
                      <table className={styles.productivityTable}>
                        <tbody>
                          <tr >
                            <th>M. ID</th>
                            <th>Utilization</th>
                            <th>Availability</th>
                          </tr>
                          <tr className={styles.productTableRow} >
                            <td>LHD 141</td>
                            <td>0</td>
                            <td>0</td>
                          </tr>
                          <tr className={styles.productTableRow} >
                            <td>LHD 142</td>
                            <td>0</td>
                            <td>0</td>
                          </tr>
                          <tr className={styles.productTableRow} >
                            <td>LHD 143</td>
                            <td>0</td>
                            <td>0</td>
                          </tr>
                          {/*
                                        (state.currentData ?? []).map(e => {
                                            return (
                                                <tr key={e.id} className={(state.currentShift.id == e.id)? styles.activeProductTableRow :styles.productTableRow} onClick={() => handleRowClick(e)}>
                                                    <td>{formatDate(e.date)}</td>
                                                    <td>{e.shift_number}</td>
                                                    <td style={(kpis.tonnage_per_shift > e.tonnage) ? {color: "red"} : {color: "green"}}>{e.tonnage}</td>
                                                    <td style={(kpis.tonnage_per_shift > e.tonnage) ? {color: "red"} : {color: "green"}}>{(parseInt(e.tonnage) / 8).toFixed(2)}</td>
                                                    <td>{e.no_of_loads}</td>
                                                    <td style={{color: "green", fontStyle: "italic"}}>clear</td>
                                                </tr>
                                            )
                                        }) 
                          */}
                        </tbody>
                      </table>

                      <ul style={{ width: "100%", margin: "10px 0 0 40px" }}>
                        <b>Additional Notes:</b>
                        <li>LHD 141 has the best efficiency</li>
                        <li>LHD 142 has improved the fuel efficiency</li>
                        <li>LHD 143 has improved the most violations and that should be reviewed</li>
                      </ul>
                    </div>
                  </div>

                  <div style={{ width: "90%", margin: "20px 0 0 0" }}>
                    <div className={styles.scroll_segment}>
                      <h2 style={{ marginBottom: "10px" }}>Violations</h2>
                      <table className={styles.productivityTable}>
                        <tbody>
                          <tr >
                            <th>M. ID</th>
                            <th>Violations</th>
                            <th>Details</th>
                          </tr>
                          <tr className={styles.productTableRow} >
                            <td>LHD 141</td>
                            <td>
                              <ul>
                                <li>Overspeed</li>
                                <li>Threshold Exceeded</li>
                                <li>SBI</li>
                              </ul>
                            </td>
                            <td>
                              <ul>
                                <li>Moving at 15km/h</li>
                                <li>Above 35</li>
                                <li>Issues were noted at around 1335</li>
                              </ul>
                            </td>
                          </tr>
                          <tr className={styles.productTableRow} >
                            <td>LHD 142</td>
                            <td>
                              <ul>
                                <li>Overspeed</li>
                                <li>Threshold Exceeded</li>
                                <li>SBI</li>
                              </ul>
                            </td>
                            <td>
                              <ul>
                                <li>Moving at 15km/h</li>
                                <li>Above 35</li>
                                <li>Issues were noted at around 1335</li>
                              </ul>
                            </td>
                          </tr>
                          <tr className={styles.productTableRow} >
                            <td>LHD 143</td>
                            <td>
                              <ul>
                                <li>Overspeed</li>
                                <li>Threshold Exceeded</li>
                                <li>SBI</li>
                              </ul>
                            </td>
                            <td>
                              <ul>
                                <li>Moving at 15km/h</li>
                                <li>Above 35</li>
                                <li>Issues were noted at around 1335</li>
                              </ul>
                            </td>
                          </tr>
                          {/*
                                        (state.currentData ?? []).map(e => {
                                            return (
                                                <tr key={e.id} className={(state.currentShift.id == e.id)? styles.activeProductTableRow :styles.productTableRow} onClick={() => handleRowClick(e)}>
                                                    <td>{formatDate(e.date)}</td>
                                                    <td>{e.shift_number}</td>
                                                    <td style={(kpis.tonnage_per_shift > e.tonnage) ? {color: "red"} : {color: "green"}}>{e.tonnage}</td>
                                                    <td style={(kpis.tonnage_per_shift > e.tonnage) ? {color: "red"} : {color: "green"}}>{(parseInt(e.tonnage) / 8).toFixed(2)}</td>
                                                    <td>{e.no_of_loads}</td>
                                                    <td style={{color: "green", fontStyle: "italic"}}>clear</td>
                                                </tr>
                                            )
                                        }) 
                          */}
                        </tbody>
                      </table>

                      <ul style={{ width: "100%", margin: "10px 0 0 40px" }}>
                        <b>Additional Notes:</b>
                        <li>LHD 141 has the best efficiency</li>
                        <li>LHD 142 has improved the fuel efficiency</li>
                        <li>LHD 143 has improved the most violations and that should be reviewed</li>
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
}



