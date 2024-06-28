import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import SmallEventCalendar from "./SmallEventCalendar";
import { parseISO, setHours, setMinutes, setSeconds, format } from "date-fns";

const UpdateShow = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const venue = useSelector((store) => store.venue);
  const [eventDetails, setEventDetails] = useState({});
  const [showCalendar, hideCalendar] = useState(true);
  const [tixTotal, setTixTotal] = useState("0");
  const [presale, setPresale] = useState("0");
  const [beer, setBeer] = useState("0");
  const [liquor, setLiquor] = useState("0");
  const [other, setOther] = useState("0");

  const formatShowDate = (date) => {
    const parsedDate = parseISO(date);
    return format(parsedDate, "MMMM d, yyyy");
  };
  const formatDoorTime = (event, parsedDate) => {
    const [hours, minutes, seconds] = event.door_time.split(":").map(Number);
    const doorTime = setSeconds(
      setMinutes(setHours(parsedDate, hours), minutes),
      seconds
    );
    return format(doorTime, "h:mm a");
  };

  const putObj = {
    tixTotal: Number(tixTotal),
    presale: Number(presale),
    beer: Number(beer),
    liquor: Number(liquor),
    other: Number(other),
    id: eventDetails.id,
    venue_id: venue.id
}

  const sendUpdate = ()=>{
    const {tixTotal, beer, liquor, other} = putObj
    if(tixTotal != 0 || beer != 0 || liquor != 0 || other != 0){
        dispatch({type: 'UPDATE_SHOW_REPORT', payload: putObj})
        history.push('/dashboard')
    } else {
        alert('Must fill out all forms, except presale (cuz I know how Minneapolis is :P )')
    }
  }

  return (
    <>
      <h1>Update</h1>
      {showCalendar ? <h3>Which Show?</h3> : ''}
      {showCalendar ? (
        <SmallEventCalendar
          eventSetter={setEventDetails}
          hideCalendar={hideCalendar}
        />
      ) : (
        <div>
          <h3>Band: {eventDetails.band_name}</h3>
          <h3>At: {eventDetails.venue_name}</h3>
          <h4>{formatShowDate(eventDetails.show_date)}</h4>
          <h4>
            {formatDoorTime(eventDetails, parseISO(eventDetails.show_date))}
          </h4>
          <h4>Capacity: {venue.capacity}</h4>
        </div>
      )}
      <h3>Tickets</h3>
      <input
        type="number"
        placeholder="Total Tickets Sold"
        value={tixTotal}
        onChange={(event) => setTixTotal(event.target.value)}
      />
      <input
        type="number"
        placeholder="Total Presale"
        value={presale}
        onChange={(event) => setPresale(event.target.value)}
      />
      <h3>Drinks</h3>
      <input
        type="number"
        placeholder="Total Beer"
        value={beer}
        onChange={(event) => setBeer(event.target.value)}
      />
      <input
        type="number"
        placeholder="Total Liquor"
        value={liquor}
        onChange={(event) => setLiquor(event.target.value)}
      />
      <input
        type="number"
        placeholder="Total Other"
        value={other}
        onChange={(event) => setOther(event.target.value)}
      />
    <br />
      {/* <pre>{JSON.stringify(eventDetails, null, 2)}</pre>
      <pre>{JSON.stringify(putObj, null, 2)}</pre> */}

      <button onClick={sendUpdate}>Submit Update</button>
    </>
  );
};

export default UpdateShow;
