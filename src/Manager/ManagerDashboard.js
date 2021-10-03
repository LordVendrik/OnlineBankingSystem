import React, { useState } from "react";
import "./ManagerFirstPage.css";
import Nav from "../NavBar/Nav";
import { useHistory } from "react-router";
import { useEffect } from "react";
import Sidebar from "../SideBarManager/Sidebar";
import { Bar } from "react-chartjs-2";

export default function ManagerDashboard() {
  const history = useHistory();
  const [bankData, setbankData] = useState({});
  const [charData, setchartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Balance in Recent 8 Months",
        data: [45, 25, 20, 10],
      },
    ],
    backgroundColor: "#f38b4a",
  });

  useEffect(() => {
    fetch("/checkCustomerType", {
      method: "get",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          history.push("/login");
        } else if (data.message !== "Manager") {
          history.push("/wrongPage");
        }
      });
  }, []);

  useEffect(() => {
    fetch("/details", { method: "get" })
      .then((res) => res.json())
      .then((data) => {
        setbankData(data);
      });

    fetch("/data", { method: "get" })
      .then((res) => res.json())
      .then((data) => {
        setchartData({
          labels: ["1", "2", "3", "4", "5", "6", "7", "8"],
          datasets: [
            {
              label: "Balance in Recent 8 Months",
              fillColor: "rgba(14,72,100,1)", //version >2 useus background color
              strokeColor: "brown",
              borderWidth: 1,
              data: data.data,
            },
          ],
          backgroundColor: "#f38b4a",
        });
      });
  }, []);

  return (
    <div className="mDash">
      <Nav />
      <Sidebar />
      <div className="manager">
        <div className="Headline">
          <h1>Manager Dashboard</h1>
        </div>
        <div className="row justify-content-md-center ">
          <div className="col-md-6 col-sm-12 col-xs-12 board mx-3 my-3 bg-info">
            <h3>Available Balance :</h3>
            <div className="values">{bankData.availableBalance}</div>
          </div>
          <div className="col-md-6 col-sm-12 col-xs-12 board mx-3 my-3 bg-success">
            <h3>Total Customers :</h3>
            <div className="values">{bankData.totalCustomers}</div>
          </div>
          <div className="col-md-6 col-sm-12 col-xs-12 board mx-3 my-3 bg-primary bg-danger">
            <h3>Customers with loans :</h3>
            <div className="values">{bankData.loanUsers}</div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-2 col-sm-12"></div>
        <div className="col-md-2 col-sm-12"></div>
        <div className="col-md-7 col-sm-12">
          <div className="chart">
            <Bar
              data={charData}
              width={50}
              height={40}
              options={{ maintainAspectRatio: true }}
            />
          </div>
        </div>
        <div className="col-md-1 col-sm-12"></div>
      </div>
    </div>
  );
}
