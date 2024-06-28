import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const history = useHistory()


  const userLogin = ()=>{
    if (username && password){
    dispatch({type: 'LOGIN', payload: {username: username, password: password }})
    } else {
        dispatch({type: 'LOGIN_INPUT_ERROR' })
    }
  }

  return (
    <>
      <h1>Login</h1>
      <input
        type="text"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />
      <br />
      <input
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <br />
      <button onClick={()=>userLogin()}>Log In</button>
      <br />
      <h4>New User?</h4>
      <br />
      <button onClick={()=>history.push('/register')}>Register</button>
    </>
  );
};

export default Login;
