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

  const saveName = ()=>{
    const putObj = {
        name: name,
        id: venue.id
    }
    dispatch({type: 'UPDATE_NAME', payload: putObj})
  }

  const saveCap = ()=>{
    const putObj = {
        capacity: cap,
        id: venue.id
    }
    dispatch({type: 'UPDATE_CAPACITY', payload: putObj})
  }

  const saveWeb = ()=>{
    const putObj = {
        website: website,
        id: venue.id
    }
    dispatch({type: 'UPDATE_WEBSITE', payload: putObj})
  }

  const saveInsta = ()=>{
    const putObj = {
        instagram: insta,
        id: venue.id
    }
    dispatch({type: 'UPDATE_INSTAGRAM', payload: putObj})
  }

  return (
    <>
      <h1>Account Info</h1>

      {readOnly ? (
        <h4>{!venue.name ? name : venue.name}</h4>
      ) : (
        <>
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <button
            onClick={saveName}
          >
            Save
          </button>
        </>
      )}
      <br />
      {readOnly ? (
        <h4>{!venue.capacity ? cap : venue.capacity}</h4>
      ) : (
        <>
          <input
            type="text"
            value={cap}
            onChange={(event) => setCap(event.target.value)}
          />
          <button
            onClick={saveCap}
          >
            Save
          </button>
        </>
      )}
      <br />
      {readOnly ? (
        <h4>{!venue.website ? website : venue.website}</h4>
      ) : (
        <>
          <input
            type="text"
            value={website}
            onChange={(event) => setWebsite(event.target.value)}
          />
          <button
            onClick={saveWeb}
          >
            Save
          </button>
        </>
      )}
      <br />
      {readOnly ? (
        <h4>{venue.instagram}</h4>
      ) : (
        <>
          <input
            type="text"
            value={insta}
            onChange={(event) => setInsta(event.target.value)}
          />
          <button
            onClick={saveInsta}
          >
            Save
          </button>
        </>
      )}
      <br />
      <button onClick={() => setReadOnly(!readOnly)}>
        {readOnly ? "Edit Info" : "Cancel Edit"}
      </button>
      {/* <button onClick={()=>saveInfo()}>Save Info</button> */}
    </>
  );
};

export default AccountInfo;
