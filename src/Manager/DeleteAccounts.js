import React from "react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import "./Datatables.css";
import Nav from "../NavBar/Nav";
import Sidebar from "../SideBarManager/Sidebar";

export default function DeleteAccounts() {
  const history = useHistory();
  const [daccountlist, deleteaccountdetails] = useState([]);
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
    fetch("/deleteaccountsManager", {
      method: "get",
    })
      .then((res) => res.json())
      .then((data) => {
        deleteaccountdetails(data.list);
      });
  }, []);

  const gotoDetails = (id) => {
    history.push(`/deleteAccountManager/${id}`);
  };

  return (
    <div>
      <Nav />
      <Sidebar />
      <div>
        <div className="container ">
          <h3>list of the Customer Accounts</h3>
          <div className="row">
            <table
              id="example"
              className="table  table-striped table-hover table-bordered   "
            >
              <thead>
                <tr>
                  <th scope="col-hover">IndexNo</th>
                  <th scope="col-hover">Accountno</th>
                  <th scope="col  ">Name of person</th>
                  <th scope="col ">Status</th>
                </tr>
              </thead>
              <tbody>
                {daccountlist.length > 0
                  ? daccountlist.map((person) => {
                      console.log(person);
                      return (
                        <tr key={person.IndNo}>
                          <th scope="row">{person.IndNo}</th>
                          <th scope="row">{person.accountno}</th>
                          <td>{person.firstname + " " + person.lastname}</td>

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
                                  gotoDetails(person.accountno);
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
