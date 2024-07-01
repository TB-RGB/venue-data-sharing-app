import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const ChartSection = () => {
  const history = useHistory()
  const [isStacked, setIsStacked] = useState(false);
  const [chartData, setChartData] = useState(null);
  const [showReport, setShowReport] = useState(null);
  const details = useSelector((store) => store.details);

  useEffect(() => {
    setShowReport(details);
  }, [details]);

  useEffect(() => {
    if (showReport) {
      updateChartData();
    }
  }, [showReport, isStacked]);

  const updateChartData = () => {
    const labels = isStacked
      ? ["Tickets", "Drinks"]
      : ["Tickets", "Presale", "Beer", "Liquor", "Other"];
    const datasets = isStacked ? getStackedDatasets() : getUnstackedDatasets();

    setChartData({
      labels,
      datasets,
    });
  };

  const getUnstackedDatasets = () => [
    {
      label: "Sales Volume",
      data: [
        showReport.total_tickets_sold,
        showReport.total_presale_sold,
        showReport.total_beer_sold,
        showReport.total_liquor_sold,
        showReport.total_other_sold,
      ],
      backgroundColor: [
        "rgba(75, 192, 192, 0.6)",
        "rgba(153, 102, 255, 0.6)",
        "rgba(255, 159, 64, 0.6)",
        "rgba(255, 99, 132, 0.6)",
        "rgba(54, 162, 235, 0.6)",
      ],
    },
  ];
  const getStackedDatasets = () => [
    {
      label: "Presale Tickets",
      data: [showReport.total_presale_sold, 0],
      backgroundColor: "rgba(153, 102, 255, 0.6)",
      stack: "Stack 0",
    },
    {
      label: "All Tickets",
      data: [showReport.total_tickets_sold, 0],
      backgroundColor: "rgba(75, 192, 192, 0.6)",
      stack: "Stack 0",
    },
    {
      label: "Beer",
      data: [0, showReport.total_beer_sold],
      backgroundColor: "rgba(255, 159, 64, 0.6)",
      stack: "Stack 1",
    },
    {
      label: "Liquor",
      data: [0, showReport.total_liquor_sold],
      backgroundColor: "rgba(255, 99, 132, 0.6)",
      stack: "Stack 1",
    },
    {
      label: "Other",
      data: [0, showReport.total_other_sold],
      backgroundColor: "rgba(54, 162, 235, 0.6)",
      stack: "Stack 1",
    },
  ];
  const options = {
    responsive: true,
    scales: {
      x: { stacked: isStacked },
      y: { stacked: isStacked },
    },
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: isStacked
          ? `Stacked Bar Chart: ${details.band_name} at ${details.venue_name}`
          : `Unstacked Bar Chart: ${details.band_name} at ${details.venue_name}`,
      },
    },
  };

  const handleClick = () => {
    setIsStacked(!isStacked);
  };



  const TicketSalesData = {
    labels: ['Presale', 'At-Door'],
    datasets: [{
        data: [details.total_presale_sold, details.total_tickets_sold-details.total_presale_sold],
        backgroundColor: ['#FF6384', '#36A2EB']
    }]
  }

  const drinkSalesData = {
    labels: ['Beer', 'Liquor', 'Other'],
    datasets: [{
      data: [details.total_beer_sold, details.total_liquor_sold, details.total_other_sold],
      backgroundColor: ['#FFCE56', '#4BC0C0', '#FF9F40'],
    }]
  };



  const capacityUtilization = ((details.total_tickets_sold / details.capacity) * 100).toFixed(2);
  const drinksPerAttendee = ((details.total_beer_sold + details.total_liquor_sold + details.total_other_sold) / details.total_tickets_sold).toFixed(2);

 
  return (
    <>
      <div className="chart-container">
        <button onClick={() => history.push("/dashboard")}>Back to Calendar</button>
        {chartData ? (
          <>
            <div style={{ width: "800px", height: "400px" }}>
              <Bar data={chartData} options={options} onClick={handleClick} />
            </div>
            <p>
              Click on the chart to toggle between stacked and unstacked view
            </p>
          </>
        ) : (
          <div>Loading...</div>
        )}
      </div>
      <div className="chart-container">
        {/* <h3>Ticket Sales Breakdown</h3> */}
        <div style={{ width: '800px', height: '400px'}}>
        <Pie data={TicketSalesData} options={{ plugins: { title: { display: true, text: 'Ticket Sales Breakdown' } } }} />
        </div>
        <div style={{ width: '800px', height: '400px'}}>
        <Pie data={drinkSalesData} options={{ plugins: { title: { display: true, text: 'Drink Sales Breakdown' } } }} />
        </div>
      </div>

      <div>
        <h3>Key Metrics</h3>
        <p>Capacity Utilization: {capacityUtilization}%</p>
        <p>Drinks per Attendee: {drinksPerAttendee}</p>
      </div>
    </>
  );
};

export default ChartSection;
