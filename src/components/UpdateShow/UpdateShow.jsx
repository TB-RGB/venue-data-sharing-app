import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import SmallEventCalendar from "./SmallEventCalendar";
import { parseISO, setHours, setMinutes, setSeconds, format } from "date-fns";

const UpdateShow = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const venue = useSelector((store) => store.venue);
  const [file, setFile] = useState(null);
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
    venue_id: venue.id,
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const sendFile = () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    dispatch({
      type: "UPDATE_WITH_FILE",
      payload: { file: formData, id: eventDetails.id, venue_id: venue.id },
    });
    setFile(null);
    history.push(`/eventDetails/${eventDetails.id}`);
    setEventDetails({})
  };

  const sendUpdate = () => {
    const { tixTotal, beer, liquor, other } = putObj;
    if (tixTotal != 0 || beer != 0 || liquor != 0 || other != 0) {
      dispatch({ type: "UPDATE_SHOW_REPORT", payload: putObj });
      history.push(`/eventDetails/${eventDetails.id}`);
      setEventDetails({})
    } else {
      alert(
        "Must fill out all forms, except presale (cuz I know how Minneapolis is :P )"
      );
    }
  };

  return (
    <>
      <div className="p-4 bg-gray-800 min-h-screen">
        <div className="container mx-auto">
          <h1
            className="text-4xl mb-2 font-bold text-center"
            style={{ fontFamily: "Chillax" }}
          >
            Update Show Report
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card bg-base-100 shadow-xl items-center pb-2">
              {showCalendar ? (
                <h3 className="text-xl mt-2" style={{ fontFamily: "Chillax" }}>Which Show?</h3>
              ) : (
                ""
              )}
              {showCalendar ? (
                <div data-theme="retro" className="card w-4/5 items-center">
                  <SmallEventCalendar
                    eventSetter={setEventDetails}
                    hideCalendar={hideCalendar}
                  />
                </div>
              ) : (
                <div className="card-body" style={{ fontFamily: "Fira Code" }}>
                  <div className="flex justify-center">
                    <h2
                      className="card-title text-2xl"
                      style={{ fontFamily: "Chillax" }}
                    >
                      Event Details
                    </h2>
                  </div>
                  <div className="flex justify-center">
                    <div className="card bg-base-300 flex-grow">
                      <div className="stat place-items-center">
                        <div className="stat-title">Band: </div>
                        <div className="stat-value">
                          {eventDetails.band_name}
                        </div>
                      </div>
                    </div>
                    <div className="divider divider-primary divider-horizontal"></div>
                    <div className="card bg-base-300 flex-grow">
                      <div className="stat place-items-center">
                        <div className="stat-title">At: </div>
                        <div className="stat-value">
                          {eventDetails.venue_name}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <div className="card bg-base-300 flex-grow">
                      <div className="stat place-items-center">
                        <div className="stat-title">Capacity: </div>
                        <div className="stat-value">{venue.capacity}</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <div className="card bg-base-300 flex-grow">
                      <div className="stat place-items-center">
                        <div className="stat-title">Show Date:</div>
                        <div className="stat-value">
                          {formatShowDate(eventDetails.show_date)}
                        </div>
                      </div>
                    </div>
                    <div className="divider divider-primary divider-horizontal"></div>
                    <div className="card bg-base-300 flex-grow">
                      <div className="stat place-items-center">
                        <div className="stat-title">Door Time:</div>
                        <div className="stat-value">
                          {formatDoorTime(
                            eventDetails,
                            parseISO(eventDetails.show_date)
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="card bg-base-100 shadow-xl items-center">
              <div className="card bg-base-200 shadow-xl mt-36" style={{fontFamily: 'Chillax'}}>
                <div className="card-body h-44">
                  <h1 className="card-title">Upload .csv</h1>
                  <div className="flex mt-10">
                    <input
                      className="file-input file-input-primary mr-5"
                      type="file"
                      accept=".csv"
                      onChange={handleFileChange}
                    />
                    <button onClick={sendFile} className={!file ? "btn btn-disabled" : "btn btn-success"}>
                      Submit Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="card bg-base-100 shadow-xl"
              style={{ fontFamily: "Fira Code" }}
            >
              <div className="card-body items-center">
                <h3
                  className="card-title text-2xl"
                  style={{ fontFamily: "Chillax" }}
                >
                  Tickets
                </h3>
                <label className="input input-bordered input-accent flex items-center gap-2">
                  Total Tickets
                  <input
                    className="mx-4"
                    type="number"
                    placeholder="Total Tickets Sold"
                    value={tixTotal}
                    onChange={(event) => setTixTotal(event.target.value)}
                  />
                </label>
                <label className="input input-bordered input-secondary flex items-center gap-2">
                  Total Presale
                  <input
                    className="mx-4"
                    type="number"
                    placeholder="Total Presale"
                    value={presale}
                    onChange={(event) => setPresale(event.target.value)}
                  />
                </label>
              </div>
            </div>
            <div
              className="card bg-base-100 shadow-xl"
              style={{ fontFamily: "Fira Code" }}
            >
              <div className="card-body items-center">
                <h3
                  className="card-title text-2xl"
                  style={{ fontFamily: "Chillax" }}
                >
                  Drinks
                </h3>
                <label className="input input-bordered input-accent flex items-center gap-2">
                  Total Beer
                  <input
                    className="mx-2"
                    type="number"
                    placeholder="Total Beer"
                    value={beer}
                    onChange={(event) => setBeer(event.target.value)}
                  />
                </label>
                <label className="input input-bordered input-secondary flex items-center gap-2">
                  Total Liquor
                  <input
                    type="number"
                    placeholder="Total Liquor"
                    value={liquor}
                    onChange={(event) => setLiquor(event.target.value)}
                  />
                </label>
                <label className="input input-bordered input-success flex items-center gap-2">
                  Total Other
                  <input
                    className="mx-2"
                    type="number"
                    placeholder="Total Other"
                    value={other}
                    onChange={(event) => setOther(event.target.value)}
                  />
                </label>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            {putObj.tixTotal != 0 &&
            putObj.beer != 0 &&
            putObj.liquor != 0 &&
            putObj.other != 0 ? (
              <button className="btn btn-success my-3" onClick={sendUpdate} style={{ fontFamily: "Chillax" }}>
                Submit Update
              </button>
            ) : (
              <button className="btn btn-disabled my-3" style={{ fontFamily: "Chillax" }}>
                Forms Not Complete
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateShow;
