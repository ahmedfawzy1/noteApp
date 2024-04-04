import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";

export default function Layout() {
  return (
    <>
      <Navbar />
      {/* <Sidebar /> */}
      <Outlet></Outlet>
      {/* <Footer /> */}
    </>
  );
}
