import React from "react";
import { Navigate } from "react-router-dom";

export default function ProductedRoute(props) {
  if (localStorage.getItem("userToken")) {
    <Navigate to={"/login"} />;
  } else {
    return props.children;
  }
}
