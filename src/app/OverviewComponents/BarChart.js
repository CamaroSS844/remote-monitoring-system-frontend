import { Bar } from "react-chartjs-2";
import styles from "../page.module.css";

export const BarChart = ({ chartData, label }) => {
  // Format the data
  console.log("chartData");
  console.log(JSON.stringify(chartData));
  const formattedData = {
    labels: chartData.map((data) => data.machine_name),
    datasets: [
      {
        label: label,
        data: chartData.map((data) => data.tonnage),
        backgroundColor: [
          "#3CC3DFc2",
          "#FFAE4Cc2",
          "#FF928Ac2",
        ],
        borderColor: [
          "#3CC3DF",
          "#FFAE4C",
          "#FF928A",
        ],
        borderWidth: 1
      }
    ]
  };

  return (
    <div className={styles.BarChartContainer}>
      <Bar
        data={formattedData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: `${label}`,
              font: {
                size: 16
              }
            },
            legend: {
              display: false
            }
          },
          scales: {
            y: {
              title: {
                display: true,
                text: "Tonnage",
              },
              beginAtZero: true,
              grid: {
                display: true
              }
            },
            x: {
              title: {
                display: true,
                text: "Machine ID",
              },
              grid: {
                display: false
              }
            }
          }
        }}
      />
    </div>
  );
};