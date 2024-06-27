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
      <h1>Registration</h1>

      <input
        type="text"
        value={newUsername}
        onChange={(event) => setNewUsername(event.target.value)}
      />
      <br />
      <input
        type="password"
        value={newPass}
        onChange={(event) => setNewPass(event.target.value)}
      />
      <br />
      <button onClick={sendRegister}>Register</button>
    </>
  );
};

export default Registration;
