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
        <Link to="/managerDashboard">Dashboard</Link>
        <Link to="/approveAccountManager">Approve New Accounts</Link>
        <Link to="/ManagerLoanList">Approve loan Requests</Link>
        <Link to="/managerDelete">Delete Customer Account</Link>
        <Link to="/watchTransactions">Watch All Transactions</Link>
        <Link to="/sendNotification">Send Notifications</Link>
        <Link to="/addClerk">Add Clerk</Link>
      </div>
    </div>
  );
}
