import React from "react";
import "./Approve.css";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Nav from "../NavBar/Nav";
import Sidebar from "../SideBarManager/Sidebar";

export default function ApproveAccount() {
  const history = useHistory();
  const [newAccountlist, setnewAccountlist] = useState([]);
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
    fetch("/applicationsManager", {
      method: "get",
    })
      .then((res) => res.json())
      .then((data) => {
        setnewAccountlist(data.list);
      });
  }, []);

  const gotoDetails = (id) => {
    history.push(`/approveAccountManager/${id}`);
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
          <h3>Approve the Customer Account</h3>
          <div className="table-responsive mt-5">
            <table className="table  table-bordered table-hover   ">
              <thead>
                <tr>
                  <th scope="col-hover">REQUEST ID</th>
                  <th scope="col  ">Name of person</th>
                  <th scope="col  ">Account Type</th>
                  <th scope="col ">Aadhar No</th>
                  <th scope="col ">Pan No</th>
                  <th scope="col ">Mobile No</th>
                  <th scope="col ">initial Amount</th>
                  <th scope="col ">Status</th>
                </tr>
              </thead>
              <tbody>
                {newAccountlist.length > 0
                  ? newAccountlist.map((person) => {
                      console.log(person);
                      return (
                        <tr key={person.request_id}>
                          <th scope="row">{person.request_id}</th>
                          <td>{person.firstname + " " + person.lastname}</td>
                          <td>{person.AccountType}</td>
                          <td>{person.aadharno}</td>
                          <td>{person.pancardno}</td>
                          <td>{person.phoneno}</td>
                          <td>{person.initialAmount}</td>
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
                                  gotoDetails(person.request_id);
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
