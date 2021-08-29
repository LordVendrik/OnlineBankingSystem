import React, { useContext } from "react";
import { userContext } from "../App";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import "./CustomerDashboard.css";
import Nav from "../NavBar/Nav";
import Sidebar from "../SideBar/Sidebar";

function CustomerDashboard() {
  const { state } = useContext(userContext);
  const [sh, setshow] = useState(false);
  const history = useHistory();
  const [showBalance, setshowBalance] = useState(false);
  const [transactionsList, settransactionsList] = useState([]);

  const showbalance = () => {
    setshowBalance(true);
  };

  const requrestTransactions = () => {
    fetch(`/customertransactionsList/${state.Accountno}`, { method: "get" })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          settransactionsList(data.list);
          console.log(data.list);
        }
      });
  };

  useEffect(() => {
    fetch("/checkCustomerType", {
      method: "get",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          history.push("/login");
        } else if (data.message !== "Customer") {
          history.push("/wrongPage");
        }
      });
  }, []);

  return (
    <div className="cusdash">
      <Nav />
      <Sidebar />
      <h2
        style={{
          textAlign: "center",
          fontFamily: "Georgia ,serif",
          textDecoration: "underline",
          textDecorationColor: "ButtonShadow",
          marginTop: "40px",
        }}
      >
        DASHBOARD
      </h2>
      <div
        className="container"
        style={{ backgroundColor: "#C9CCD5", backgroundPosition: "cover" }}
      >
        <div className="table-responsive ">
          <table className="table  table-bordered table-hover   ">
            <thead>
              <tr>
                <th scope="col-hover">Account No</th>
                <th scope="col  ">Account-holder Name</th>
                <th scope="col  ">Account Type</th>
                <th scope="col ">Account Balance</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">{state ? state.Accountno : "loading"}</th>
                <td>
                  {state ? state.firstName + " " + state.lastName : "loading"}
                </td>
                <td>{state ? state.AccountType : "loading"}</td>
                <td>
                  {showBalance ? (
                    state ? (
                      state.Amount
                    ) : (
                      "loading"
                    )
                  ) : (
                    <a
                      href="#balance"
                      onClick={() => {
                        showbalance();
                      }}
                    >
                      Click here to watch Balance
                    </a>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div
        className="container"
        style={{ backgroundColor: "#C9CCD5", backgroundPosition: "cover" }}
      >
        <div className="link">
          <a
            className="showTransations"
            href="#t"
            onClick={() => {
              setshow(!sh);
              requrestTransactions();
            }}
          >
            <h3>Show last 10 Transaction History</h3>
          </a>
        </div>
        {sh ? (
          <div className="table-responsive   ">
            <table className="table  table-bordered table-hover ">
              <thead>
                <tr>
                  <th scope="col">Transfered To</th>
                  <th scope="col">Beneficiary IFSC Code</th>
                  <th scope="col">Date/Time</th>
                  <th scope="col  ">Description</th>
                  <th scope="col  ">Debit</th>
                  <th scope="col ">Credit</th>
                </tr>
              </thead>
              <tbody>
                {transactionsList.length > 0
                  ? transactionsList.map((singleTrans) => {
                      return (
                        <tr key={singleTrans.Transaction_ID}>
                          <th scope="row">{singleTrans.transferedto}</th>
                          <th scope="row">{singleTrans.ifsccode}</th>
                          <th scope="row">
                            {singleTrans.date},{singleTrans.time}
                          </th>
                          <td>{singleTrans.remarks}</td>
                          <td>
                            {state.Accountno == singleTrans.transferfrom
                              ? singleTrans.amount
                              : ""}
                          </td>
                          <td>
                            {state.Accountno == singleTrans.transferedto
                              ? singleTrans.amount
                              : ""}
                          </td>
                        </tr>
                      );
                    })
                  : console.log("meow")}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>
    </div>
  );
}
export default CustomerDashboard;
