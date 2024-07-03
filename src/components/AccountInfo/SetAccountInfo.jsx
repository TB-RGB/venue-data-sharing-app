import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const AccountInfo = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [cap, setCap] = useState("");
  const [website, setWebsite] = useState("");
  const [insta, setInsta] = useState("");
  const user = useSelector((store) => store.user);

  const saveInfo = () => {
    const postObj = {
      name: name,
      capacity: cap,
      website: website,
      instagram: insta,
      id: user.id,
    };
    dispatch({ type: "SEND_VENUE", payload: postObj });
    history.push("/dashboard");
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
              className="card bg-base-100 w-3/6 shadow-xl items-center h-2/3"
              style={{ fontFamily: "Chillax" }}
            >
              <div className="flex mt-5">
                <div className="card bg-base-200 shadow-xl mx-20 my-16">
                  <div className="label">
                    <div className="label-text">Name</div>
                  </div>
                  <input
                    className="input input-secondary mx-2 mb-1"
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Venue Name"
                  />
                  <div className="divider divider-primary">Venue Info</div>
                  <div className="label">
                    <div className="label-text">Capacity</div>
                  </div>
                  <input
                    className="input input-secondary mx-2 mb-1"
                    type="text"
                    value={cap}
                    onChange={(event) => setCap(event.target.value)}
                    placeholder="Capacity"
                  />
                </div>
                <div className="card bg-base-200 shadow-xl mx-20 my-16">
                <div className="label">
                        <div className="label-text">Website</div>
                      </div>
                  <input
                    className="input input-secondary mx-2 mb-1"
                    type="text"
                    value={website}
                    onChange={(event) => setWebsite(event.target.value)}
                    placeholder="Website"
                  />
                 <div className="divider divider-primary">Socials</div>
                 <div className="label">
                        <div className="label-text">Instagram</div>
                      </div>
                  <input
                    className="input input-secondary mx-2 mb-1"
                    type="text"
                    value={insta}
                    onChange={(event) => setInsta(event.target.value)}
                    placeholder="Instagram"
                  />
                </div>
              </div>

              <button className="btn btn-success mb-5" onClick={() => saveInfo()}>Save Info</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountInfo;
