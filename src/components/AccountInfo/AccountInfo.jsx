import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const AccountInfo = ({ venue }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);
  const [name, setName] = useState(venue.name);
  const [cap, setCap] = useState(venue.capacity);
  const [website, setWebsite] = useState(venue.website);
  const [insta, setInsta] = useState(venue.instagram);
  const [readOnly, setReadOnly] = useState(true);

  const saveName = () => {
    const putObj = {
      name: name,
      id: venue.id,
    };
    dispatch({ type: "UPDATE_NAME", payload: putObj });
    setReadOnly(!readOnly);
  };

  const saveCap = () => {
    const putObj = {
      capacity: cap,
      id: venue.id,
    };
    dispatch({ type: "UPDATE_CAPACITY", payload: putObj });
    setReadOnly(!readOnly);
  };

  const saveWeb = () => {
    const putObj = {
      website: website,
      id: venue.id,
    };
    dispatch({ type: "UPDATE_WEBSITE", payload: putObj });
    setReadOnly(!readOnly);
  };

  const saveInsta = () => {
    const putObj = {
      instagram: insta,
      id: venue.id,
    };
    dispatch({ type: "UPDATE_INSTAGRAM", payload: putObj });
    setReadOnly(!readOnly);
  };

  const toggleEdit = () => {
    setReadOnly(!readOnly);
    setCap(venue.capacity);
    setName(venue.name);
    setInsta(venue.instagram);
    setWebsite(venue.website);
  };

  return (
    <>
      <div className="p-4 bg-gray-800 min-h-screen">
        <div className="container mx-auto">
          <h1
            className="text-4xl mt-20 mb-8 font-bold text-center"
            style={{ fontFamily: "Chillax" }}
          >
            Account Info
          </h1>
          <div className="flex justify-center">
            <div
              className="card bg-base-100 w-4/6 shadow-xl items-center h-2/3"
              style={{ fontFamily: "Chillax" }}
            >
              <div className="flex">
                <div className="card bg-base-200 shadow-xl mx-20 my-16">
                  {readOnly ? (
                    <div className="stat place-items-center">
                      <div className="stat-title">Name</div>
                      <div className="stat-value">
                        {!venue.name ? name : venue.name}
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="label">
                        <div className="label-text">Name</div>
                      </div>
                      <input
                        className={
                          cap === venue.capacity &&
                          website === venue.website &&
                          insta === venue.instagram
                            ? "input input-secondary mx-2 mb-1"
                            : "input input-disabled mx-2 mb-1"
                        }
                        type="text"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                      />
                      <button
                        className={
                          cap === venue.capacity &&
                          website === venue.website &&
                          insta === venue.instagram
                            ? "btn btn-success mx-2 btn-sm"
                            : "btn btn-disabled mx-2 btn-sm"
                        }
                        onClick={saveName}
                      >
                        Save
                      </button>
                    </>
                  )}
                  <div className="divider divider-primary">Venue Info</div>
                  {readOnly ? (
                    <div className="stat place-items-center">
                      <div className="stat-title">Capacity</div>
                      <div className="stat-value">
                        {!venue.capacity ? cap : venue.capacity}
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="label">
                        <div className="label-text">Capacity</div>
                      </div>
                      <input
                        className={
                          name === venue.name &&
                          website === venue.website &&
                          insta === venue.instagram
                            ? "input input-secondary mx-2 mb-1"
                            : "input input-disabled mx-2 mb-1"
                        }
                        type="text"
                        value={cap}
                        onChange={(event) => setCap(event.target.value)}
                      />
                      <button
                        className={
                          name === venue.name &&
                          website === venue.website &&
                          insta === venue.instagram
                            ? "btn btn-success mx-2 btn-sm"
                            : "btn btn-disabled mx-2 btn-sm"
                        }
                        onClick={saveCap}
                      >
                        Save
                      </button>
                    </>
                  )}
                </div>

                <div className="card bg-base-200 shadow-xl mx-20 my-16">
                  {readOnly ? (
                    <div className="stat place-items-center">
                      <div className="stat-title">Website</div>
                      <div className="stat-value">
                        {!venue.website ? website : venue.website}
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="label">
                        <div className="label-text">Website</div>
                      </div>
                      <input
                        className={
                          name === venue.name &&
                          cap === venue.capacity &&
                          insta === venue.instagram
                            ? "input input-secondary mx-2 mb-1"
                            : "input input-disabled mx-2 mb-1"
                        }
                        type="text"
                        value={website}
                        onChange={(event) => setWebsite(event.target.value)}
                      />
                      <button
                        className={
                          name === venue.name &&
                          cap === venue.capacity &&
                          insta === venue.instagram
                            ? "btn btn-success mx-2 btn-sm"
                            : "btn btn-disabled mx-2 btn-sm"
                        }
                        onClick={saveWeb}
                      >
                        Save
                      </button>
                    </>
                  )}
                  <div className="divider divider-primary">Socials</div>
                  {readOnly ? (
                    <div className="stat place-items-center">
                      <div className="stat-title">Instagram</div>
                      <div className="stat-value">{venue.instagram}</div>
                    </div>
                  ) : (
                    <>
                      <div className="label">
                        <div className="label-text">Instagram</div>
                      </div>
                      <input
                        className={
                          name === venue.name &&
                          cap === venue.capacity &&
                          website === venue.website
                            ? "input input-secondary mx-2 mb-1"
                            : "input input-disabled mx-2 mb-1"
                        }
                        type="text"
                        value={insta}
                        onChange={(event) => setInsta(event.target.value)}
                      />
                      <button
                        className={
                          name === venue.name &&
                          cap === venue.capacity &&
                          website === venue.website
                            ? "btn btn-success mx-2 btn-sm"
                            : "btn btn-disabled mx-2 btn-sm"
                        }
                        onClick={saveInsta}
                      >
                        Save
                      </button>
                    </>
                  )}
                </div>
              </div>
              <div className="mb-5">
                <button
                  className="btn btn-secondary mr-3"
                  onClick={() => toggleEdit()}
                >
                  {readOnly ? "Edit Info" : "Cancel Edit"}
                </button>
                <button
                  onClick={() => history.push("/dashboard")}
                  className="btn btn-accent ml-3"
                >
                  To Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountInfo;
