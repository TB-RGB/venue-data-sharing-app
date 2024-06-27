import { useDispatch, useSelector } from "react-redux";
import EventCalendar from "./EventCalendar";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


const Dashboard = () => {
  const user = useSelector(store=>store.user)
  const dispatch = useDispatch();
  const history = useHistory()


  return (
    <>
      <h1>Dashboard</h1>
      <button onClick={()=>history.push('/addShow')}>Add to Calendar</button>
      {' '}
      <button onClick={()=>history.push('/updateShow')}>Update Show Report</button>
      <EventCalendar />
    </>
  );
};

export default Dashboard;
