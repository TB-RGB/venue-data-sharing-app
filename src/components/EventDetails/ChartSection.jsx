import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import {
  parseISO,
  setHours,
  setMinutes,
  setSeconds,
  format,
  isValid,
} from "date-fns";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const ChartSection = ({ deleteFn }) => {
  const history = useHistory();
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
  const formatShowDate = (date) => {
    if (!date) return "N/A";
    const parsedDate = parseISO(date);
    return isValid(parsedDate)
      ? format(parsedDate, "MMMM d, yyyy")
      : "Invalid Date";
  };

  const formatDoorTime = (event) => {
    if (!event || !event.door_time || !event.show_date) return "N/A";
    const parsedDate = parseISO(event.show_date);
    if (!isValid(parsedDate)) return "Invalid Date";

    const [hours, minutes, seconds] = event.door_time.split(":").map(Number);
    if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) return "Invalid Time";

    const doorTime = setSeconds(
      setMinutes(setHours(parsedDate, hours), minutes),
      seconds
    );
    return format(doorTime, "h:mm a");
  };

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
      backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56", "#4BC0C0", "#FF9F40"],
    },
  ];
  const getStackedDatasets = () => [
    {
      label: "Presale Tickets",
      data: [showReport.total_presale_sold, 0],
      backgroundColor: "#FF6384",
      stack: "Stack 0",
    },
    {
      label: "All Tickets",
      data: [showReport.total_tickets_sold, 0],
      backgroundColor: "#36A2EB",
      stack: "Stack 0",
    },
    {
      label: "Beer",
      data: [0, showReport.total_beer_sold],
      backgroundColor: "#FFCE56",
      stack: "Stack 1",
    },
    {
      label: "Liquor",
      data: [0, showReport.total_liquor_sold],
      backgroundColor: "#4BC0C0",
      stack: "Stack 1",
    },
    {
      label: "Other",
      data: [0, showReport.total_other_sold],
      backgroundColor: "#FF9F40",
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
      legend: { display: false },
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

  const ticketSalesData = {
    labels: ["Presale", "At-Door"],
    datasets: [
      {
        data: [
          details.total_presale_sold,
          details.total_tickets_sold - details.total_presale_sold,
        ],
        backgroundColor: ["#FF6384", "#36A2EB"],
      },
    ],
  };

  const drinkSalesData = {
    labels: ["Beer", "Liquor", "Other"],
    datasets: [
      {
        data: [
          details.total_beer_sold,
          details.total_liquor_sold,
          details.total_other_sold,
        ],
        backgroundColor: ["#FFCE56", "#4BC0C0", "#FF9F40"],
      },
    ],
  };

  const capacityUtilization = (
    (details.total_tickets_sold / details.capacity) *
    100
  ).toFixed(2);
  const drinksPerAttendee = (
    (details.total_beer_sold +
      details.total_liquor_sold +
      details.total_other_sold) /
    details.total_tickets_sold
  ).toFixed(2);

  return (
    <>
      <div className="p-4 bg-gray-800 min-h-screen">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">
            {details.band_name} at {details.venue_name}
          </h1>
          <div className="flow-root">
            <button
              onClick={() => history.push("/dashboard")}
              className="btn btn-primary mb-4 float-start"
            >
              Back to Calendar
            </button>

            <button onClick={deleteFn} className="btn btn-secondary float-end">Delete Event</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">Key Metrics</h2>
                <div className="flex justify-center">
                  <div className="card bg-base-300 flex-grow">
                    <div className="stat place-items-center">
                      <div className="stat-title">Show Date</div>
                      <div className="stat-value">
                        {formatShowDate(details.show_date)}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="divider divider-start divider-accent">
                  Venue Info
                </div>
                <div className="flex justify-center mr-10">
                  <div className="card bg-base-300 flex-grow">
                    <div className="stat place-items-center">
                      <div className="stat-title">Door Time</div>
                      <div className="stat-value">
                        {formatDoorTime(details)}
                      </div>
                    </div>
                  </div>
                  <div className="divider divider-secondary divider-horizontal"></div>
                  <div className="card bg-base-300 flex-grow">
                    <div className="stat place-items-center">
                      <div className="stat-title">Venue Capacity</div>
                      <div className="stat-value">{details.capacity}</div>
                    </div>
                  </div>
                </div>
                <div className="divider divider-start divider-accent">
                  Event Stats
                </div>
                <div className="flex justify-center">
                  <div className="card bg-base-300 flex-grow">
                    <div className="stat place-items-center">
                      <div className="stat-title">Total Tickets Sold</div>
                      <div className="stat-value">
                        {details.total_tickets_sold}
                      </div>
                    </div>
                  </div>
                  <div className="divider divider-secondary divider-horizontal"></div>
                  <div className="card bg-base-300 flex-grow">
                    <div className="stat place-items-center">
                      <div className="stat-title">Drinks per Attendee</div>
                      <div className="stat-value">{drinksPerAttendee}</div>
                    </div>
                  </div>
                  <div className="divider divider-secondary divider-horizontal"></div>
                  <div className="card bg-base-300 flex-grow">
                    <div className="stat">
                      <div className="stat-title">Capacity Utilization</div>
                      <div className="stat-value">{capacityUtilization}%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">Sales Overview</h2>
                {chartData ? (
                  <Bar
                    data={chartData}
                    options={options}
                    onClick={() => setIsStacked(!isStacked)}
                  />
                ) : (
                  <div>Loading...</div>
                )}
                <p className="text-sm text-gray-500 mt-2">
                  Click on the chart to toggle between stacked and unstacked
                  view
                </p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl flex">
              <div className="card-body items-center">
                <h2 className="card-title">Ticket Sales Breakdown</h2>
                <div
                  className="flex justify-center"
                  style={{ width: "800px", height: "400px" }}
                >
                  <Pie data={ticketSalesData} />
                </div>
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl flex">
              <div className="card-body items-center">
                <h2 className="card-title">Drink Sales Breakdown</h2>
                <div
                  style={{ width: "800px", height: "400px" }}
                  className="flex justify-center"
                >
                  <Pie data={drinkSalesData} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChartSection;
