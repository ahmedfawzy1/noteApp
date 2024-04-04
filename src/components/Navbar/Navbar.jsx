import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { NoteContext } from "../Context/NotesContext";
import { UserContext } from "../Context/UserContext";

export default function Navbar() {
  let { noteUserNumber, noteAllUserNumber } = useContext(NoteContext);
  let { userToken } = useContext(UserContext);

  return (
    <>
      <Link className="navbar-brand" to={"/"}>
        <div style={{ backgroundColor: "#0DCAF0" }} className="w-100 py-2 text-white text-center fixed-top">
          Notes Number: {userToken ? noteUserNumber : noteAllUserNumber}
        </div>
      </Link>
    </>
  );
}
