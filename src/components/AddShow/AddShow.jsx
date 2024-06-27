import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const AddShow = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const bands = useSelector((store) => store.bands);
  const venue = useSelector((store) => store.venue);
  const [band, setBand] = useState("");
  const [date, setDate] = useState("");
  const [doorTime, setDoorTime] = useState("00:00:00");
  const [ageLimits, setAgeLimits] = useState("");

  const postShow = () => {
    const showObj = {
      band_id: band,
      venue_id: venue.id,
      show_date: date,
      door_time: doorTime,
      age_restrictions: ageLimits,
    };
    if (
      band === "" ||
      date === "" ||
      doorTime === "00:00:00" ||
      ageLimits === ""
    ) {
      alert("Must fill out all fields!");
      return;
    } else {
      dispatch({ type: "SEND_NEW_REPORT", payload: showObj });
      history.push("/dashboard");
    }
  };

  return (
    <>
      <h1>Add Show</h1>
      <h3>Band</h3>
      <select
        name="Bands"
        value={band}
        onChange={(event) => setBand(event.target.value)}
      >
        <option disabled value="">
          --Pick a Band--
        </option>
        {bands.map((band) => (
          <option value={band.id} key={band.id}>
            {band.name}
          </option>
        ))}
      </select>
      <h3>Date</h3>
      <input
        type="date"
        value={date}
        onChange={(event) => setDate(event.target.value)}
      />
      <h3>Door Time</h3>
      <input
        type="time"
        value={doorTime}
        onChange={(event) => setDoorTime(event.target.value)}
      />
      <h3>Age Limits</h3>
      <button onClick={() => setAgeLimits("All Ages")}>All Ages</button>{" "}
      <button onClick={() => setAgeLimits("18+")}>18+</button>{" "}
      <button onClick={() => setAgeLimits("21+")}>21+</button>
      <br />
      <br />
      <button onClick={() => postShow()}>Save to Calendar</button>
      <br />
      <br />
      <button onClick={() => history.push("/dashboard")}>
        Back to Dashboard
      </button>
    </>
  );
};

export default AddShow;
