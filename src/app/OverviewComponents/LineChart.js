import React from "react";
import { Line } from "react-chartjs-2";
import styles from "../page.module.css";

export default function LineChart({data, options}) {
    return (
            <Line data={data} options={options} className={styles.BarChart} />
    )
}