import React, { useContext } from "react";
import { UserContext } from "../Context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import style from "./sidebar.module.css";

export default function Sidebar() {
  let { userToken, setUserToken } = useContext(UserContext);
  let navigate = useNavigate();
  function logOut() {
    localStorage.removeItem("userToken");
    setUserToken(null);
    navigate("/");
  }

  return (
    <>
      <div className={`${style.sidebar} p-0 min-vh-100 bg-dark position-absolute`}>
        <ul className="text-light list-unstyled">
          <li className="p-3 pe-lg-2 sidebar-element d-flex justify-content-center align-items-center flex-column">
            <Link to={"/"}>
              <i className="fa-regular fa-note-sticky text-info fs-2 pe-1"></i>
              <p className="fs-4 m-0 text-white">Notes</p>
            </Link>
          </li>
          <li className="p-3 pe-lg-5 sidebar-element">
            <Link to={"/"} className="nav-link px-0 px-lg-2">
              {" "}
              <i className="fa-solid fa-house" />
              <span className="px-lg-2 ms-1 d-none d-lg-inline">Home</span>{" "}
            </Link>
          </li>

          {userToken ? (
            <li className="p-3 pe-lg-5 sidebar-element">
              <div onClick={logOut} className="nav-link px-0 px-lg-2">
                {" "}
                <i className="fa-solid fa-right-from-bracket"></i>
                <span className="px-lg-2 ms-1 d-none d-lg-inline">Logout</span>{" "}
              </div>
            </li>
          ) : (
            <li className="p-3 pe-lg-5 sidebar-element">
              <Link to={"/login"} className="nav-link px-0 px-lg-2">
                <i className="fa-solid fa-right-from-bracket"></i>
                <span className="px-lg-2 ms-1 d-none d-lg-inline">LogIn</span>{" "}
              </Link>
            </li>
          )}
        </ul>
      </div>
    </>
  );
}
