import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Registration = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [newUsername, setNewUsername] = useState("");
  const [newPass, setNewPass] = useState("");

  const sendRegister = () => {
    dispatch({
      type: "REGISTER",
      payload: {
        username: newUsername,
        password: newPass,
      },
    });
    history.push("/accountSetup");
  };

  return (
    <>
      <div className="hero bg-gray-800 min-h-screen">
        <div
          className="hero-content flex-col lg:flex-row-reverse"
          style={{ fontFamily: "Chillax" }}
        >
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold mb-2">Registration</h1>
            <p>All u need is nayme aand pswrd</p>
          </div>
          <div className="card bg-base-100 w-full mb-10 max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <div className="label">
                <span className="label-text">Username</span>
              </div>
              <input
                className="input input-secondary"
                required
                type="text"
                value={newUsername}
                onChange={(event) => setNewUsername(event.target.value)}
                placeholder="username"
              />
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                className="input input-primary"
                required
                type="password"
                value={newPass}
                onChange={(event) => setNewPass(event.target.value)}
                placeholder="password"
              />
             
              <button className="btn btn-success text-xl mt-3" onClick={sendRegister}>Register</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Registration;
