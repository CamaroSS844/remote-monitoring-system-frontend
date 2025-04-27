import styles from "./../page.module.css";
import Image from "next/image";
import { TPHChart } from "@/app/utils/dataSortingApi";
import { BarChart } from "@/app/OverviewComponents/BarChart";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/lib/hooks";
import { dataSelector } from "@/lib/features/dataStorageSlice";
import { KPIselector } from "@/lib/features/kpiSlice";
import { sensorDataSelector } from "@/lib/features/sensorDataStorageSlice";
import LineChart from "@/app/OverviewComponents/LineChart";

const lineData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Daily Data",
        data: [600, 850, 480, 1000, 1220, 800, 1050],
        borderColor: "#007bff",
        backgroundColor: "rgba(0, 123, 255, 0.5)",
        tension: 0.3,
      },
      {
        label: "Expected Target",
        data: [735, 735, 735, 735, 735, 735, 735],
        borderColor: "#ff0000",
        backgroundColor: "rgba(255, 0, 0, 0.5)",
        borderDash: [5, 5],
        tension: 0.3,
      },
    ],
  };
  
  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };


export default function ShiftData() {
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

    const [tonnageData, setTonnageData] = useState({
        labels: [],
        datasets: [
            {
                label: "Tonnage per Shift",
                data: [],
                borderColor: "#007bff",
                backgroundColor: "rgba(0, 123, 255, 0.5)",
                tension: 0.3,
            },
            {
                label: "Target Tonnage",
                data: [],
                borderColor: "#ff0000",
                backgroundColor: "rgba(255, 0, 0, 0.5)",
                borderDash: [5, 5],
                tension: 0.3,
            },
        ],
    });

    const [cumulativeTonnageData, setCumulativeTonnageData] = useState({
        labels: [],
        datasets: [
            {
                label: "Cumulative Tonnage",
                data: [],
                borderColor: "#28a745",
                backgroundColor: "rgba(40, 167, 69, 0.5)",
                tension: 0.3,
            }
        ],
    });

    const [dailyTonnageData, setDailyTonnageData] = useState({
        labels: [],
        datasets: [
            {
                label: "Daily Total Tonnage",
                data: [],
                borderColor: "#28a745",
                backgroundColor: "rgba(40, 167, 69, 0.5)",
                tension: 0.3,
            }
        ],
    });

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    const data = useAppSelector(dataSelector);
    const kpis = useAppSelector(KPIselector)[0];
    const sensorData = useAppSelector(sensorDataSelector);
    const [state, setState] = useState({
        currentDate: data.slice(-1)[0].date,
        currentData: [...data.slice(-10)],
        currentShift: {...data.slice(-1)[0]},
        dateLimits: { first: null, last: data.slice(-1)[0].date },
        currentSensorData: [...sensorData.slice(-10)],
        currentSensorShift: {...sensorData.slice(-1)[0]},
        titles: Object.keys({...sensorData.slice(-1)[0]}).filter(x => x != 'date').filter(x => x != 'id').filter(x => x != 'shift_number').filter(x => x != 'machine').filter(x => x != 'mine'),
        totalDistance: 0,
        currentAltShift: {},
        fuelIntensity: 0,
        totalBuckets: 0,
        totalTonnage: 0
    })
    var count = 3000;

    const formatDate = date => date.split('-').reverse().join('/');

    const handleRowClick = (e) => {
        setState({...state, currentShift: {...e} });
    }

    const handleDateFilter = (e) => {
        const temp = data.findIndex(i => i.date == e.target.value)
        const sensorTemp = sensorData.findIndex(i => i.date == e.target.value)

        if (temp != undefined) {

            setState({...state, currentDate: e.target.value});
            if ((temp - 9) < 0) {
                setState({
                    ...state, currentData: data.slice(0, (temp + 1)) , currentShift: {...data[temp]},
                    currentSensorData: sensorData.slice(0, (sensorTemp + 1)), currentSensorShift: {...sensorData[sensorTemp]}
                })
            } else {
                setState({
                    ...state, currentData: data.slice(temp - 9, temp + 1), currentShift: {...data[temp]},
                    currentSensorData: sensorData.slice(sensorTemp - 9, sensorTemp + 1), currentSensorShift: {...sensorData[sensorTemp]}
                });
            }
        } else {
            alert("No data for this date");
        }
    }

    useEffect(() => {
        if (state.currentData && state.currentData.length > 0) {
            // Update tonnage per shift chart
            const labels = state.currentData.map(e => `${formatDate(e.date)} S${e.shift_number}`);
            const tonnages = state.currentData.map(e => e.tonnage);
            const targetTonnage = new Array(labels.length).fill(kpis.tonnage_per_shift);

            setTonnageData({
                labels,
                datasets: [
                    {
                        ...tonnageData.datasets[0],
                        data: tonnages
                    },
                    {
                        ...tonnageData.datasets[1],
                        data: targetTonnage
                    }
                ]
            });

            // Calculate and update cumulative tonnage
            const cumulativeTonnages = tonnages.reduce((acc, curr, i) => {
                const prev = i > 0 ? acc[i - 1] : 0;
                acc.push(prev + Number(curr));
                return acc;
            }, []);

            setCumulativeTonnageData({
                labels,
                datasets: [
                    {
                        ...cumulativeTonnageData.datasets[0],
                        data: cumulativeTonnages
                    }
                ]
            });

            // Calculate daily totals by combining shifts
            const dailyTotals = state.currentData.reduce((acc, curr) => {
                const date = curr.date;
                if (!acc[date]) {
                    acc[date] = { total: 0, count: 0 };
                }
                acc[date].total += Number(curr.tonnage);
                acc[date].count++;
                return acc;
            }, {});

            // Convert to array format for chart
            const dailyLabels = Object.keys(dailyTotals).map(date => formatDate(date));
            const dailyValues = Object.values(dailyTotals).map(data => data.total);

            setDailyTonnageData({
                labels: dailyLabels,
                datasets: [
                    {
                        ...dailyTonnageData.datasets[0],
                        data: dailyValues
                    }
                ]
            });
        }
    }, [state.currentData, kpis.tonnage_per_shift]);

    return (
        <div style={{ margin: "10px", display: "flex", flexDirection: "column", width: "100%" }}>
            <div className={styles.filterBar}>
                <div className={styles.filter}>
                    <input
                        type='date'
                        name="date"
                        defaultValue={state.dateLimits.last}
                        onChange={(e) => handleDateFilter(e)}
                        required
                    />
                </div>
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
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", flexWrap: "wrap", width: "100%" }}>
                <div className={styles.weightContainer}>
                    <h3>Productivity</h3>
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", width: "100%" }}>
                        <div style={{ width: "45%", display: "flex", flexDirection: "column" }}>
                            <LineChart data={tonnageData} options={chartOptions}/>
                            <LineChart data={dailyTonnageData} options={chartOptions}/>
                        </div>
                        <div className={styles.productivity} style={{ width: "60%" }}>
                            <table className={styles.productivityTable}>
                                <tbody>
                                    <tr >
                                        <th>Date</th>
                                        <th>Shift</th>
                                        <th>Tonnage</th>
                                        <th>Ave Ton/h</th>
                                        <th>No. Cycles</th>
                                        <th>Viol</th>
                                    </tr>
                                    {
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
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className={styles.statsRow}>
                    <div>
                        <span>Mileage(km)/shift</span>
                        <span className={styles.values}>{parseInt(state.currentShift.distance_travelled).toFixed(1)}</span>
                    </div>
                    <div>
                        <span>Operating hrs</span>
                        <span className={styles.values}>{parseInt(state.currentShift.operating_hours).toFixed(1)}</span>
                    </div>
                    <div>
                        <span>Engine Hours</span>
                        <span className={styles.values}>{parseInt(state.currentShift.engine_hours).toFixed(1)}</span>
                    </div>
                    <div>
                        <span>Transmission hours</span>
                        <span className={styles.values}>{parseInt(state.currentShift.transmission_hours).toFixed(1)}</span>
                    </div>
                    <div>
                        <span>Fuel/shift</span>
                        <span className={styles.values} style={(kpis.fuel_per_shift < state.currentShift.fuel_consumed) ? {color: "red"} : {color: "green"}} >{parseInt(state.currentShift.fuel_consumed).toFixed(1)}</span>
                    </div>
                    <div>
                        <span>Fuel Intensity</span>
                        <span className={styles.values}>0.00</span>
                    </div>
                </div>

                <div className={styles.weightContainer}>
                    <h3>Ave Sensor Data</h3>
                    <div className={styles.productivity} style={{ width: "100%", display: "flex" }}>
                        <div className={styles.tableContainer}>
                            <table className={styles.scrollableTable}>
                                <tbody>
                                    <tr>
                                        <th>Date</th>
                                        <th>Shift</th>
                                        <th>BW1 FL Brake Wear</th>
                                        <th>BW2 FR Brake Wear</th>
                                        <th>BW3 RL Brake Wear</th>
                                        <th>BW4 RR Brake Wear</th>
                                        <th>BT1 FL Brake Temp</th>
                                        <th>BT1 FR Brake Temp</th>
                                        <th>BT1 RL Brake Temp</th>
                                        <th>BT1 RR Brake Temp</th>
                                        <th>Hoist Cyl. Len</th>
                                        <th>Dump Cyl. Len</th>
                                        <th>Accelerator Pedal</th>
                                        <th>Battery</th>
                                        <th>Accumulator</th>
                                        <th>Brake Return</th>
                                        <th>Hydraulic Reflux</th>
                                        <th>Up-Box Oil</th>
                                        <th>Pilot</th>
                                        <th>Dump Cyl.Extend</th>
                                        <th>Dump Cyl.Retract</th>
                                        <th>Hoist Cyl.Extend</th>
                                        <th>Hoist Cyl.Retract</th>
                                        <th>Steering Cyl. LH Extend</th>
                                        <th>Steering Cyl. RH Extend</th>
                                        <th>Service Brake</th>
                                        <th>Parking Brake</th>
                                        <th>Diesel</th>
                                        <th>Hydraulic Oil</th>
                                        <th>Transmission Oil</th>
                                        <th>Brake Cooling Oil</th>
                                    </tr>
                                    {
                                        (state.currentSensorData ?? []).map(e => (
                                            <tr key={e.id} className={((state.currentShift.date == e.date) && (state.currentShift.shift_number == e.shift_number) )? styles.activeProductTableRow :styles.productTableRow}>
                                                <td>{formatDate(e.date)}</td>
                                                <td>{e.shift_number}</td>
                                                {
                                                    state.titles.map(x => {e
                                                        count ++
                                                        return (
                                                        <td key={count} style={{color: e[x] > 40? "red":  (e[x] > 30? "orange": "green")}} >{e[x]}</td>
                                                    )}
                                                        )
                                                }
                                            </tr>
                                        )
                                  )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>


                <div className={styles.weightContainer}>
                    <h3>Violations</h3>
                    <div style={{ display: "flex", justifyContent: "centre", alignItems: "centre", margin: "10px 0" }}>
                        <span>
                            <i style={{ color: "green" }}>No Violations Recorded</i>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}