import React from "react";
import { Link } from "react-router-dom";
import "../style.css";

const closeSideNav = () => {
  document.getElementById("mySidebar").style.left = "-200px";
  document.getElementById("openBut").style.display = "block";
  console.log("closing");
};

const openSideNav = () => {
  document.getElementById("mySidebar").style.left = "0px";
  document.getElementById("openBut").style.display = "none";
  console.log("Opening");
};

export default function Sidebar() {
  return (
    <div>
      <div className="sideMenuBut" id="openBut">
        <button
          className="btn btn-light"
          onClick={() => {
            openSideNav();
          }}
        >
          ☰
        </button>
      </div>
      <div id="mySidebar" className="sidebar bg-dark">
        <a
          href="#close"
          className="closebtn coll"
          onClick={(e) => {
            closeSideNav();
            e.preventDefault();
          }}
        >
          ×
        </a>
        <Link to="/customerDashboard">Dashboard</Link>
        <Link to="/customerTransaction">Watch Transactions History</Link>
        <Link to="/CustomerLoanRequest">Apply for Loan</Link>
        <Link to="/transferFund">Transfer Money</Link>
        <Link to="/customerCorrection">Apply For Corrections</Link>
        <Link to="/queryHistory">Watch Query History</Link>
      </div>
    </div>
  );
}
