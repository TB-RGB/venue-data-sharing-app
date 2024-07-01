import { useSelector } from "react-redux";
import EventCalendar from "./EventCalendar";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Dashboard = () => {
  const history = useHistory();
  const venue = useSelector(store=>store.venue)

  return (
    <>
      <div className="p-4 bg-gray-800 min-h-screen">
        <h1 className="text-5xl font-bold text-center" style={{fontFamily: 'Hack'}}>{venue.name}'s Events Dashboard</h1>
        <div className="card mt-5 pb-10 mx-40 pt-5 bg-base-300">
          <div className="flex justify-center mb-2" style={{fontFamily: 'Fira Code'}}>
          <button className="btn btn-primary mx-12" onClick={() => history.push("/addShow")}>
            Add to Calendar
          </button>
          <button className="btn btn-secondary mx-12" onClick={() => history.push("/updateShow")}>
            Update Show Report
          </button>
          </div>
          <div
            data-theme="retro"
            className="card bg-base-100 mx-32 flex items-center"
          >
            <EventCalendar />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
