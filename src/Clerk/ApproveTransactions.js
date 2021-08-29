import React from "react";
import "./Approve.css";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Nav from "../NavBar/Nav";
import Sidebar from "../SideBarCLerk/Sidebar";

export default function ApproveTransactions() {
  const history = useHistory();
  const [newTransactionlist, setnewTransactionlist] = useState([]);
  useEffect(() => {
    fetch("/checkCustomerType", {
      method: "get",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          history.push("/login");
        } else if (data.message !== "Clerk") {
          history.push("/wrongPage");
        }
      });
  }, []);

  useEffect(() => {
    fetch("/transactionlist", {
      method: "get",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
          return;
        }
        console.log(data.list);
        setnewTransactionlist(data.list);
      });
  }, []);

  const gotoDetails = (id) => {
    history.push(`/approveTransactions/${id}`);
  };

  return (
    <div>
      <Nav />
      <Sidebar />
      <div>
        <div
          className="container mt-5"
          style={{ backgroundColor: "#C9CCD5", backgroundPosition: "cover" }}
        >
          <h3>Approve all the Customers Trasaction</h3>
          <div className="table-responsive mt-5">
            <table className="table  table-bordered table-hover   ">
              <thead>
                <tr>
                  <th scope="col-hover">Transaction ID</th>
                  <th scope="col  ">Beneficiary Name</th>
                  <th scope="col  ">Beneficiary Account no</th>
                  <th scope="col ">Beneficiary IFSC Code</th>
                  <th scope="col ">Amount</th>
                  <th scope="col ">Date</th>
                  <th scope="col ">Time</th>
                  <th scope="col ">Status</th>
                </tr>
              </thead>
              <tbody>
                {newTransactionlist.length > 0
                  ? newTransactionlist.map((person) => {
                      console.log(person);
                      return (
                        <tr key={person.transaction_id}>
                          <th scope="row">{person.transaction_id}</th>
                          <td>{person.beneficiaryname}</td>
                          <td>{person.beneficiaryaccountno}</td>
                          <td>{person.beneficiaryifsccode}</td>
                          <td>{person.amount}</td>
                          <td>{person.date}</td>
                          <td>{person.time}</td>
                          <td>
                            <div
                              className="btn-group"
                              role="group"
                              aria-label="Status"
                            >
                              <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => {
                                  gotoDetails(person.transaction_id);
                                }}
                              >
                                View Details
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  : console.log("loading")}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
