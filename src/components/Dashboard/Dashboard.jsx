import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const Dashboard = () => {
  const user = useSelector(store=>store.user)
  const dispatch = useDispatch();


  return (
    <>
      <h1>Dashboard</h1>
    </>
  );
};

export default Dashboard;
