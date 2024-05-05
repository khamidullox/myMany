import { useContext } from "react";
import { GlobalContext } from "../hooks/useGlobal";
import useSingup from "../hooks/useSingup";
import toast from "react-hot-toast";
function Navbar() {
  let { handleSingOut } = useSingup();
  let { dispetch, user } = useContext(GlobalContext);
  let handleLogout = () => {
    toast("Bye Bye", {
      icon: "👏",
    });
    dispetch({ type: "LOG_OUT", user: null });
  };
  return (
    <ul className="navbar bg-neutral px-10 flex justify-between ">
      <li className="">
        <button className="btn btn-success   text-xl ">MyMany</button>
      </li>
      <li className="text-white  flex-col lg:flex hidden ">
        <p>Name: {user.displayName}</p>

        <p>Email: {user.email} </p>
      </li>
      <li>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img alt="Tailwind CSS Navbar component" src={user.photoURL} />
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            handleLogout();
            handleSingOut();
          }}
          className="btn btn-accent ml-8"
        >
          LogOut
        </button>
      </li>
    </ul>
  );
}

export default Navbar;
