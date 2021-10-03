import React from "react";
import Sidebar from "../SideBarManager/Sidebar";
import Nav from "../NavBar/Nav";
import "./ClerkAED.css";
import { useHistory } from "react-router";
import { useState, useEffect } from "react";

export default function ManagerLoanList() {
  const history = useHistory();
  const [list, setlist] = useState([]);

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
    fetch("/productDetails", {
      method: "Get",
    })
      .then((res) => res.json())
      .then((data) => {
        setlist(data.data);
      });
  }, []);

  const gotoLoanDetails = (id) => {
    history.push(`/loanDetails/${id}`);
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
          <h3>
            {" "}
            <u>Customers who apply for loan </u>
          </h3>
          <div className="table-responsive mt-5">
            <table className="table  table-bordered table-hover   ">
              <thead>
                <tr>
                  <th scope="col-hover">Loan ID</th>
                  <th scope="col  ">Account No</th>
                  <th scope="col ">Loan Type</th>
                  <th scope="col ">Loan Amount</th>
                  <th scope="col ">Email</th>
                  <th scope="col">Details</th>
                </tr>
              </thead>
              <tbody>
                {list.length > 0
                  ? list.map((d) => {
                      return (
                        <tr key={d.LoanId}>
                          <td scope="row">{d.LoanId}</td>
                          <td>{d.accountno}</td>
                          <td>{d.LoanType}</td>
                          <td>{d.loanamount}</td>
                          <td>{d.Emailid}</td>
                          <td>
                            <div
                              className="btn-group"
                              role="group"
                              aria-label=""
                            >
                              <button
                                id="one"
                                type="button"
                                className="btn btn-primary"
                                onClick={() => {
                                  gotoLoanDetails(d.LoanId);
                                }}
                              >
                                View details
                              </button>
                              {/* <button id="three" type="button" className="btn btn-danger">Delete</button> */}
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
