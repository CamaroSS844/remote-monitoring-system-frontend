import { MachineStatus, TotalTonnagePH, NumberOfCycles, TotalTonnage, Mileage } from "./Data";


export const MSChart = {
    labels: MachineStatus.map((data) => data.status),
    datasets: [ 
      {
        label: "Machine Status",
        data: MachineStatus.map((data) => data.number),
        backgroundColor: [
          "#3CC3DF",
          "#FFAE4C",
          "#FF928A",
        ],
      }
    ]
}

export const TPHChart = {
    labels: TotalTonnagePH.map((data) => data.hour),
    datasets: [ 
      {
        label: "Machine Status",
        xAxisId: "Time",
        yAxisId: "Tons",
        data: TotalTonnagePH.map((data) => data.tonnage),
        backgroundColor: [
          "#3CC3DF",
          "#FFAE4C",
          "#FF928A",
        ],
      },
      {
        label: "Expected Value",
        data: [15, 15, 15, 15, 15, 15],
        type: "line",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 2,
        pointRadius: 3,
        pointBackgroundColor: "rgba(255, 99, 132, 1)",
        fill: false,
      }
    ]
}

export const TTChart = {
    labels: TotalTonnage.map((data) => data.day),
    datasets: [ 
      {
        label: "Machine Status",
        data: TotalTonnage.map((data) => data.tonnage),
        backgroundColor: [
          "#3CC3DF",
          "#FFAE4C",
          "#FF928A",
        ],
      }
    ]
}

export const NoCChart = {
    labels: NumberOfCycles.map((data) => data.name),
    datasets: [ 
      {
        label: "Machine Status",
        data: NumberOfCycles.map((data) => data.cycles),
        backgroundColor: [
          "#3CC3DF",
          "#FFAE4C",
          "#FF928A",
        ],
      },
      {
        label: "Expected Value",
        data: [10, 10, 10],
        type: "line",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 2,
        pointRadius: 3,
        zIndex: 3,
        pointBackgroundColor: "rgba(255, 99, 132, 1)",
        fill: false,
      }
    ]  
}
export const MileageChart = {
    labels: Mileage.map((data) => data.name),
    datasets: [ 
      {
        label: "Machine Status",
        data: Mileage.map((data) => data.distance),
        backgroundColor: [
          "#3CC3DF",
          "#FFAE4C",
          "#FF928A",
        ],
      }
    ]  
}