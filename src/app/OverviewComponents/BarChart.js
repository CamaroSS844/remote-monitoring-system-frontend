// components/BarChart.js
import { Bar } from "react-chartjs-2";
import styles from "../page.module.css"

export const BarChart = ({ chartData, label }) => {
  return (
    <div className={styles.BarChart}>
      <Bar
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: `${label}`
            },
            legend: {
              display: false,
            }
          }
        }}
      />
    </div>
  );
};