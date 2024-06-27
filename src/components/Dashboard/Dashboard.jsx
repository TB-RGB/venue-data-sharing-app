import { useDispatch, useSelector } from "react-redux";
import EventCalendar from "./EventCalendar";

const Dashboard = () => {
  const user = useSelector(store=>store.user)
  const dispatch = useDispatch();


  return (
    <>
      <h1>Dashboard</h1>
      <EventCalendar />
    </>
  );
};

export default Dashboard;
