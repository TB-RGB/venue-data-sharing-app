import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useToaster, Message } from "rsuite";

const AddShow = () => {
  const toaster = useToaster();
  const dispatch = useDispatch();
  const history = useHistory();
  const bands = useSelector((store) => store.bands);
  const venue = useSelector((store) => store.venue);
  const addedBand = useSelector((store) => store.newBand);
  const [newBand, setNewBand] = useState("");
  const [band, setBand] = useState("");
  const [date, setDate] = useState("");
  const [doorTime, setDoorTime] = useState("00:00:00");
  const [ageLimits, setAgeLimits] = useState("");
  const [hideInputs, setHideInputs] = useState(false);

  const addBand = () => {
    const sendBand = { name: newBand };
    dispatch({ type: "ADD_BAND", payload: sendBand });
    setHideInputs(true);
    // setNewBand("");
  };

  const postShow = () => {
    const showObj = {
      band_id: band === "" && addedBand != {} ? addedBand : band,
      venue_id: venue.id,
      show_date: date,
      door_time: doorTime,
      age_restrictions: ageLimits,
    };
    if (date === "" || doorTime === "00:00:00" || ageLimits === "") {
      alert("Must fill out all fields!");
      return;
    } else {
      dispatch({ type: "SEND_NEW_REPORT", payload: showObj });
      toaster.push(<Message>Event added to calendar!</Message>, {
        placement: "topCenter",
        duration: 5000,
      });
      history.push("/dashboard");
    }
  };

  return (
    <>
      <div className="p-4 bg-gray-800 min-h-screen">
        <div className="container mx-auto">
          <h1
            className="text-4xl mt-16 mb-5 font-bold text-center"
            style={{ fontFamily: "Chillax" }}
          >
            Add a Show
          </h1>
          <div className="flex justify-center">
            <div className="card bg-base-100 w-4/6 shadow-xl items-center ">
              <div className="card bg-base-200 w-5/12 shadow-xl mt-8 p-5 mb-5">
                <h3
                  className="text-xl text-center"
                  style={{ fontFamily: "Chillax" }}
                >
                  Who?
                </h3>
                <div className="label">
                  <span className="label-text">Add a New Band</span>
                </div>
                <div>
                  {!hideInputs ? (
                    <input
                      type="text"
                      className="input input-secondary mb-2 w-48"
                      value={newBand}
                      onChange={(event) => setNewBand(event.target.value)}
                    />
                  ) : (
                    <input
                      type="text"
                      className="input input-disabled mb-2 w-48"
                      value={newBand}
                      onChange={(event) => setNewBand(event.target.value)}
                    />
                  )}
                  {!hideInputs ? (
                    <button
                      onClick={() => addBand()}
                      className="btn btn-success ml-10"
                    >
                      Add Band
                    </button>
                  ) : (
                    <button
                      onClick={() => addBand()}
                      className="btn btn-disabled ml-10"
                    >
                      Add Band
                    </button>
                  )}
                </div>
                <div className="divider divider-primary">OR</div>
                <div className="label">
                  <div className="label-text">Select an Existing Band</div>
                </div>

                {!hideInputs && newBand === "" && (
                  <select
                    className="select select-secondary"
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
                )}

                {(hideInputs || newBand != "") && (
                  <select disabled className="select select-disabled">
                    <option>--Pick a Band--</option>
                  </select>
                )}
              </div>

              <div className="card bg-base-200 w-5/12 shadow-xl p-5">
                <h3
                  className="text-xl text-center"
                  style={{ fontFamily: "Chillax" }}
                >
                  When?
                </h3>
                <div className="flex space-x-20">
                  <div>
                    <div className="label">
                      <div className="label-text">Date</div>
                    </div>
                    <input
                      className="input input-primary"
                      type="date"
                      value={date}
                      onChange={(event) => setDate(event.target.value)}
                    />
                  </div>
                  <div>
                    <div className="label">
                      <div className="label-text">Door Time</div>
                    </div>
                    <input
                      className="input input-primary"
                      type="time"
                      value={doorTime}
                      onChange={(event) => setDoorTime(event.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="card bg-base-200 shadow-xl mt-5 p-5 w-5/12 items-center">
                <h3
                  className="text-xl mb-3 text-center"
                  style={{ fontFamily: "Chillax" }}
                >
                  Age Limit
                </h3>
                <div className="join">
                  <button
                    className={
                      ageLimits === "All Ages"
                        ? "btn btn-disabled join-item"
                        : "btn btn-info join-item"
                    }
                    onClick={() => setAgeLimits("All Ages")}
                  >
                    All Ages
                  </button>
                  <button
                    className={
                      ageLimits === "18+"
                        ? "btn btn-disabled join-item"
                        : "btn btn-secondary join-item"
                    }
                    onClick={() => setAgeLimits("18+")}
                  >
                    18+
                  </button>
                  <button
                    className={
                      ageLimits === "21+"
                        ? "btn btn-disabled join-item"
                        : "btn btn-primary join-item"
                    }
                    onClick={() => setAgeLimits("21+")}
                  >
                    21+
                  </button>
                </div>
              </div>
              <div className="flex space-x-24 mt-10 mb-8">
                <button className="btn btn-success" onClick={() => postShow()}>
                  Save to Calendar
                </button>

                <button
                  className="btn btn-accent"
                  onClick={() => history.push("/dashboard")}
                >
                  Back to Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddShow;
