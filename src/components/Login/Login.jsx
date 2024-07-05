import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const userLogin = () => {
    if (username && password) {
      dispatch({
        type: "LOGIN",
        payload: { username: username, password: password },
      });
    } else {
      dispatch({ type: "LOGIN_INPUT_ERROR" });
    }
  };

  return (
    <>
      <div className="hero bg-gray-800 min-h-screen">
        <div
          className="hero-content flex-col lg:flex-row-reverse"
          style={{ fontFamily: "Chillax" }}
        >
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold mb-2">Login</h1>
            <p>Some shtuff about Showcase here or whatever</p>
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
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="username"
              />
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                className="input input-primary"
                required
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="password"
              />

              <button className="btn btn-success" onClick={() => userLogin()}>
                Log In
              </button>
              <div className="ml-56">
                <div className="label">
                  <span className="label-text">New User?</span>
                </div>
                <button
                  className="btn btn-accent"
                  onClick={() => history.push("/register")}
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
