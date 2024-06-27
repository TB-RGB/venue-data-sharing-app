import { useEffect } from "react";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";
import Navbar from "../Navbar/Navbar.jsx";
import Login from "../Login/Login.jsx";
import Registration from "../Registration/Registration.jsx";
import Dashboard from "../Dashboard/Dashboard.jsx";
import AddShow from "../AddShow/AddShow.jsx";
import UpdateShow from "../UpdateShow/UpdateShow.jsx";
import BandPage from "../BandPage/BandPage.jsx";
import AccountInfo from "../AccountInfo/AccountInfo.jsx";
import MyProfile from "../MyProfile/MyProfile.jsx";
import SetAccountInfo from "../AccountInfo/SetAccountInfo.jsx";

import "rsuite/dist/rsuite.min.css";
import "./App.css";

function App() {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);
  const venue = useSelector((store) => store.venue);

  useEffect(() => {
    dispatch({ type: "FETCH_USER" });

    if (user.id) {
      dispatch({ type: "FETCH_VENUE", payload: user.id });
    }

    dispatch({ type: "FETCH_BANDS" });
  }, [dispatch, user.id]);

  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/">
          {user.id ? <Redirect to="/dashboard" /> : <Login />}
        </Route>
        <Route path="/login">
          {user.id ? <Redirect to="/dashboard" /> : <Login />}
        </Route>

        <Route path="/register">
          {user.id ? <Redirect to="/account" /> : <Registration />}
        </Route>

        <ProtectedRoute path="/dashboard">
          <Dashboard />
        </ProtectedRoute>

        <ProtectedRoute path="/addShow">
          <AddShow />
        </ProtectedRoute>

        <ProtectedRoute path="/updateShow">
          <UpdateShow />
        </ProtectedRoute>

        <ProtectedRoute path="/bandPage">
          <BandPage />
        </ProtectedRoute>

        <ProtectedRoute path="/myProfile">
          <MyProfile />
        </ProtectedRoute>

        <ProtectedRoute path="/account">
          <AccountInfo venue={venue} />
        </ProtectedRoute>

        <ProtectedRoute path="/accountSetup">
          {!venue.id ? <SetAccountInfo /> : <Redirect to="/account" />}
        </ProtectedRoute>
      </Switch>
    </Router>
  );
}

export default App;
