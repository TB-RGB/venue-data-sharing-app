import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Navbar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((store) => store.user);

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    dispatch({ type: "UNSET_VENUE" });
  };

  return (
    <>
      <div className="drawer drawer-end">
        <input id="menu-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <div className="navbar bg-success">
            <div className="flex-1">
              <button
                onClick={() => history.push("/dashboard")}
                className="btn btn-ghost text-2xl text-slate-950"
                style={{fontFamily: 'Chillax'}}
              >
                Showcase
              </button>
            </div>
            <div className="flex-none">
              <label
                htmlFor="menu-drawer"
                className="drawer-button btn btn-square btn-ghost"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-5 w-5 stroke-black"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
          </div>
        </div>
        <div className="drawer-side">
          <label htmlFor="menu-drawer" className="drawer-overlay"></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-40 p-4">
            <li className="mt-16">
              {user.id && (
                <button className="btn btn-info" onClick={() => history.push("/account")}>
                  Account Settings
                </button>
              )}
            </li>
            <li className="mt-5">
                {user.id && <button className="btn btn-primary">My Profile</button>}
            </li>
            <li className="mt-32">
              {user.id && <button className="btn text-lg btn-secondary" onClick={() => logout()}>Log Out</button>}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
