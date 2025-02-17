import { Bar } from "react-chartjs-2";
import styles from "../page.module.css";

export const BarChart = ({ chartData, label }) => {
  return (
    <div className={styles.BarChartContainer}>
      <Bar
        data={chartData}
        options={{
          responsive: true, // Make the chart responsive
          maintainAspectRatio: false, // Allow the chart to adjust to the container's height
          plugins: {
            title: {
              display: true,
              text: `${label}`,
            },
            legend: {
              display: false,
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Tonnage", 
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Machine id", 
                },
                beginAtZero: true, 
              },
          },
        }
      }}
      />
    </div>
  );
};