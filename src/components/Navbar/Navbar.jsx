import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <Link className="navbar-brand" to={"/"}>
        <div style={{ backgroundColor: "#0DCAF0" }} className="w-100 py-2 text-white text-center fixed-top">
          Note App
        </div>
      </Link>
    </>
  );
}
