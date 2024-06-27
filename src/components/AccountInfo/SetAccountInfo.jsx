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

  const saveInfo = ()=>{
    const postObj = {
        name: name,
        capacity: cap,
        website: website,
        instagram: insta,
        id: user.id
    }
    dispatch({type: 'SEND_VENUE', payload: postObj})
    history.push('/dashboard')
  }




  return (
    <>
      <h1>Account Info</h1>
      <input
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <br />
      <input
        type="text"
        value={cap}
        onChange={(event) => setCap(event.target.value)}
      />
      <br />
      <input
        type="text"
        value={website}
        onChange={(event) => setWebsite(event.target.value)}
      />
      <br />
      <input
        type="text"
        value={insta}
        onChange={(event) => setInsta(event.target.value)}
      />
      <br />
      
      <button onClick={()=>saveInfo()}>Save Info</button>
    </>
  );
};

export default AccountInfo;
