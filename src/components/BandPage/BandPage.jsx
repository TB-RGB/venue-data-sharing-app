import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useState, useMemo, useEffect } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const BandPage = ()=>{
    const { id } = useParams();
    const dispatch = useDispatch()
    const bandDetails = useSelector(store=>store.bandDetails)
    const [selectedChart, setSelectedChart] = useState("ticketVolume");

    if(!bandDetails || bandDetails.length === 0){
        dispatch({type: 'FETCH_BAND_DETAILS', payload: id})
    }
    const processedData = useMemo(() => {
        return bandDetails
          .filter((event) => event.total_tickets_sold !== null)
          .map((event) => ({
            date: new Date(event.show_date).toLocaleDateString(),
            ticketsSold: event.total_tickets_sold,
            presaleSold: event.total_presale_sold,
            beerSold: event.total_beer_sold,
            liquorSold: event.total_liquor_sold,
            otherSold: event.total_other_sold,
            totalItemsSold: event.total_tickets_sold + event.total_beer_sold + event.total_liquor_sold + event.total_other_sold,
            venueName: event.venue_name,
          }))
          .sort((a, b) => a.date - b.date);
      }, [bandDetails]);

      const createChartData = (labels, datasets) => ({
        labels,
        datasets: datasets.map((dataset) => ({
          ...dataset,
          borderWidth: 1,
        })),
      });
    
      const ticketVolumeChart = createChartData(
        processedData.map((item) => `${item.venueName} (${item.date})`),
        [
          {
            label: "Total Tickets Sold",
            data: processedData.map((item) => item.ticketsSold),
            backgroundColor: "rgba(75, 192, 192, 0.6)",
            borderColor: "rgba(75, 192, 192, 1)",
          },
          {
            label: "Presale Tickets",
            data: processedData.map((item) => item.presaleSold),
            backgroundColor: "rgba(255, 159, 64, 0.6)",
            borderColor: "rgba(255, 159, 64, 1)",
          },
        ]
      );
    
      const drinkVolumeChart = createChartData(
        processedData.map((item) => `${item.venueName} (${item.date})`),
        [
          {
            label: "Beer Volume",
            data: processedData.map((item) => item.beerSold),
            backgroundColor: "rgba(255, 206, 86, 0.6)",
            borderColor: "rgba(255, 206, 86, 1)",
          },
          {
            label: "Liquor Volume",
            data: processedData.map((item) => item.liquorSold),
            backgroundColor: "rgba(153, 102, 255, 0.6)",
            borderColor: "rgba(153, 102, 255, 1)",
          },
          {
            label: "Other Drinks Volume",
            data: processedData.map((item) => item.otherSold),
            backgroundColor: "rgba(255, 99, 132, 0.6)",
            borderColor: "rgba(255, 99, 132, 1)",
          },
        ]
      );
    
      const totalVolumeChart = createChartData(
        processedData.map((item) => `${item.venueName} (${item.date})`),
        [
          {
            label: "Total Items Sold",
            data: processedData.map((item) => item.totalItemsSold),
            backgroundColor: "rgba(54, 162, 235, 0.6)",
            borderColor: "rgba(54, 162, 235, 1)",
          },
        ]
      );
    
      const salesCompositionData = {
        labels: ["Tickets", "Beer", "Liquor", "Other Drinks"],
        datasets: [
          {
            data: [
              processedData.reduce((sum, item) => sum + item.ticketsSold, 0),
              processedData.reduce((sum, item) => sum + item.beerSold, 0),
              processedData.reduce((sum, item) => sum + item.liquorSold, 0),
              processedData.reduce((sum, item) => sum + item.otherSold, 0),
            ],
            backgroundColor: [
              "rgba(75, 192, 192, 0.6)",
              "rgba(255, 206, 86, 0.6)",
              "rgba(153, 102, 255, 0.6)",
              "rgba(255, 99, 132, 0.6)",
            ],
            borderColor: [
              "rgba(75, 192, 192, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 99, 132, 1)",
            ],
            borderWidth: 1,
          },
        ],
      };
    
      const salesPerEventChart = createChartData(
        processedData.map((item) => `${item.venueName} (${item.date})`),
        [
          {
            label: "Tickets Sold",
            data: processedData.map((item) => item.ticketsSold),
            backgroundColor: "rgba(255, 99, 132, 0.6)",
            borderColor: "rgba(255, 99, 132, 1)",
            stack: 'Stack 0',
          },
          {
            label: "Beer Sold",
            data: processedData.map((item) => item.beerSold),
            backgroundColor: "rgba(54, 162, 235, 0.6)",
            borderColor: "rgba(54, 162, 235, 1)",
            stack: 'Stack 0',
          },
          {
            label: "Liquor Sold",
            data: processedData.map((item) => item.liquorSold),
            backgroundColor: "rgba(75, 192, 192, 0.6)",
            borderColor: "rgba(75, 192, 192, 1)",
            stack: 'Stack 0',
          },
          {
            label: "Other Drinks Sold",
            data: processedData.map((item) => item.otherSold),
            backgroundColor: "rgba(153, 102, 255, 0.6)",
            borderColor: "rgba(153, 102, 255, 1)",
            stack: 'Stack 0',
          },
        ]
      );
    
      const options = {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Event Performance Dashboard",
          },
        },
      };
    
      const stackedOptions = {
        plugins: {
          title: {
            display: true,
            text: 'Sales per Event',
          },
        },
        responsive: true,
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
          },
        },
      };
    
    
      const renderChart = () => {
        switch (selectedChart) {
          case "ticketVolume":
            return <Bar data={ticketVolumeChart} options={options} />;
          case "drinkVolume":
            return <Bar data={drinkVolumeChart} options={options} />;
          case "totalVolume":
            return <Line data={totalVolumeChart} options={options} />;
          case "salesComposition":
            return <Pie style={{height: '600px'}} data={salesCompositionData} options={options} />;
          case "salesPerEvent":
            return <Bar data={salesPerEventChart} options={{ stackedOptions }} />;
          default:
            return null;
        }
      };

    return(
        <>
         <div className="flex flex-col h-screen bg-gray-800">
        {/* <div className="bg-base-100 p-4 shadow-lg">
        <div className="flex items-center space-x-4">
          <input
            type="date"
            className="input input-bordered"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            className="input input-bordered"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <label className="cursor-pointer label">
            <span className="label-text mr-2">Compare</span> 
            <input
              type="checkbox"
              className="toggle toggle-primary"
              checked={compareMode}
              onChange={() => setCompareMode(!compareMode)}
            />
          </label>
        </div>
      </div> */}

        <div className="flex flex-1 overflow-hidden">
          <div className="w-64 bg-base-100 p-4 shadow-lg">
            <h1 className="text-2xl font-bold mb-6">
              {bandDetails[0].band_name ? bandDetails[0].band_name : 'Band'}'s Dashboard
            </h1>
            <div className="flex flex-col space-y-2">
              <button
                className={`btn ${
                  selectedChart === "ticketVolume" ? "btn-primary" : "btn-ghost"
                }`}
                onClick={() => setSelectedChart("ticketVolume")}
              >
                Ticket Volume
              </button>
              <button
                className={`btn ${
                  selectedChart === "drinkVolume" ? "btn-primary" : "btn-ghost"
                }`}
                onClick={() => setSelectedChart("drinkVolume")}
              >
                Drink Volume
              </button>
              <button
                className={`btn ${
                  selectedChart === "totalVolume" ? "btn-primary" : "btn-ghost"
                }`}
                onClick={() => setSelectedChart("totalVolume")}
              >
                Total Volume
              </button>
              <button
                className={`btn ${
                  selectedChart === "salesComposition"
                    ? "btn-primary"
                    : "btn-ghost"
                }`}
                onClick={() => setSelectedChart("salesComposition")}
              >
                Sales Composition
              </button>
              <button
                className={`btn ${
                  selectedChart === "salesPerEvent"
                    ? "btn-primary"
                    : "btn-ghost"
                }`}
                onClick={() => setSelectedChart("salesPerEvent")}
              >
                Sales per Event
              </button>
            </div>
          </div>

          {/* Charts */}
          <div className="flex-1 p-8 overflow-auto">
            <div className="card bg-base-100 w-5/6 shadow-xl">
              <div className="card-body">
                <h2 className="card-title mb-4">
                  {selectedChart === "ticketVolume" && "Ticket Sales Volume"}
                  {selectedChart === "drinkVolume" && "Drink Sales Volume"}
                  {selectedChart === "totalVolume" &&
                    "Total Sales Volume Trend"}
                  {selectedChart === "salesComposition" &&
                    "Overall Sales Composition"}
                  {selectedChart === "salesPerEvent" && "Sales per Event"}
                </h2>
                <div className="h-5/6">{renderChart()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
       
        </>
    )
}

export default BandPage