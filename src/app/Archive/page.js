//to inform next js this is a client component
"use client";

import styles from "./page.module.css";

import React, { useEffect, useRef, useState } from "react";




import { retrieveData, retrieveKPIs, retrieveReportData } from "../utils/apiCalls";
import { initialize } from "@/lib/features/machinesSlice";
import { initializeKPIs } from "@/lib/features/kpiSlice";
import { useAppDispatch } from "@/lib/hooks";
import Image from "next/image";



export default function Archive() {
  const dispatch = useAppDispatch();
  const [checkboxes, setCheckboxes] = useState(0);
  const [fileDownloads, setFileDownloads] = useState({
    "16/02/2025": "weekly_report_as_at_16/02/2025.pdf",
    "09/02/2025": "weekly_report_as_at_09/02/2025.pdf",
    "02/02/2025": "weekly_report_as_at_02/02/2025.pdf",
    "26/01/2025": "weekly_report_as_at_26/01/2025.pdf",
    "19/01/2025": "weekly_report_as_at_19/01/2025.pdf",
    "12/01/2025": "weekly_report_as_at_12/01/2025.pdf",
    "05/01/2025": "weekly_report_as_at_05/01/2025.pdf",
  });

  const handleCheckbox = (event) => {
    setCheckboxes((prevCount) => event.target.checked ? prevCount + 1 : prevCount - 1);
  };



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

  const generatefileType = (date, fileType) => {
    var title = `weekly_report_as_at_${date}.${fileType == "pdf" ? "pdf" : "xlsx"}`;
    setFileDownloads({...fileDownloads, [date]: title});
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.mainContainer}>
          <div className={styles.mainContent}>
            <div>
              <div style={{ display: "flex", flexDirection: "row", color: "#fff", marginTop: "5px" }}>
                <div style={{ display: "flex", flexDirection: "column", width: "50%" }}>
                  <span className={styles.mainHeading}>Weekly Peformance Report Archive</span>
                  <span style={{ fontWeight: "lighter" }}>Last Updated: 12/02/2025 08:00</span>
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
                <div style={{ width: "90%", margin: "20px 0 0 0" }}>
                  <div className={styles.scroll_segment}>
                    <h2 style={{ marginBottom: "10px" }}>Vehicle Peformance Comparison</h2>

                    <table className={styles.productivityTable} style={{width: "90%"}}>
                      <tbody>
                        <tr >
                          <td></td>
                          <th>Date</th>
                          <th>File Type</th>
                          <th>Size</th>
                          <th>Download</th>
                        </tr>
                        <tr className={styles.productTableRow} >
                          <td>
                            <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" style={{cursor: "pointer"}} onChange={handleCheckbox}/>
                          </td>
                          <td>16/02/2025</td>
                          <td>
                            <select style={{width: "100%", height: "100%", border: "none", }} onChange={e => generatefileType("16/02/2025", e.target.value)}>
                              <option value="pdf">PDF</option>
                              <option value="excel">Excel</option>
                            </select>
                          </td>
                          <td>0.00</td>
                          <td className={styles.DownloadLink}>{fileDownloads["16/02/2025"]}</td>
                        </tr>
                        <tr className={styles.productTableRow} >
                          <td>
                            <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" style={{cursor: "pointer"}} onChange={handleCheckbox}/>
                          </td>
                          <td>09/02/2025</td>
                          <td>
                            <select style={{width: "100%", height: "100%", border: "none", }} onChange={e => generatefileType("09/02/2025", e.target.value)}>
                              <option value="pdf">PDF</option>
                              <option value="excel">Excel</option>
                            </select>
                          </td>
                          <td>0.00</td>
                          <td className={styles.DownloadLink}>{fileDownloads["09/02/2025"]}</td>
                        </tr>
                        <tr className={styles.productTableRow} >
                          <td>
                            <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" style={{cursor: "pointer"}} onChange={handleCheckbox}/>
                          </td>
                          <td>02/02/2025</td>
                          <td>
                            <select style={{width: "100%", height: "100%", border: "none", }} onChange={e => generatefileType("02/02/2025", e.target.value)}>
                              <option value="pdf" >PDF</option>
                              <option value="excel" >Excel</option>
                            </select>
                          </td>
                          <td>0.00</td>
                          <td className={styles.DownloadLink}>{fileDownloads["02/02/2025"]}</td>
                        </tr>
                        <tr className={styles.productTableRow} >
                          <td>
                            <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" style={{cursor: "pointer"}} onChange={handleCheckbox}/>
                          </td>
                          <td>26/01/2025</td>
                          <td>
                            <select style={{width: "100%", height: "100%", border: "none", }} onChange={e => generatefileType("26/01/2025", e.target.value)}>
                              <option value="pdf" >PDF</option>
                              <option value="excel" >Excel</option>
                            </select>
                          </td>
                          <td>0.00</td>
                          <td className={styles.DownloadLink}>{fileDownloads["26/01/2025"]}</td>
                        </tr>
                        <tr className={styles.productTableRow} >
                          <td>
                            <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" style={{cursor: "pointer"}} onChange={handleCheckbox}/>
                          </td>
                          <td>19/01/2025</td>
                          <td>
                            <select style={{width: "100%", height: "100%", border: "none", }} onChange={e => generatefileType("19/01/2025", e.target.value)}>
                              <option value="pdf" >PDF</option>
                              <option value="excel" >Excel</option>
                            </select>
                          </td>
                          <td>0.00</td>
                          <td className={styles.DownloadLink}>{fileDownloads["19/01/2025"]}</td>
                        </tr>
                        <tr className={styles.productTableRow} >
                          <td>
                            <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" style={{cursor: "pointer"}} onChange={handleCheckbox}/>
                          </td>
                          <td>12/01/2025</td>
                          <td>
                            <select style={{width: "100%", height: "100%", border: "none", }} onChange={e => generatefileType("12/01/2025", e.target.value)}>
                              <option value="pdf" >PDF</option>
                              <option value="excel" >Excel</option>
                            </select>
                          </td>
                          <td>0.00</td>
                          <td className={styles.DownloadLink}>{fileDownloads["12/01/2025"]}</td>
                        </tr>
                        <tr className={styles.productTableRow} >
                          <td>
                            <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" style={{cursor: "pointer"}} onChange={handleCheckbox}/>
                          </td>
                          <td>05/01/2025</td>
                          <td>
                            <select style={{width: "100%", height: "100%", border: "none", }} onChange={e => generatefileType("05/01/2025", e.target.value)}>
                              <option value="pdf" >PDF</option>
                              <option value="excel" >Excel</option>
                            </select>
                          </td>
                          <td>0.00</td>
                          <td>{fileDownloads["05/01/2025"]}</td>
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
                    <button className={checkboxes < 2? styles.downloadButtonInactive: styles.downloadButtonActive}>Bulk Download</button>
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


