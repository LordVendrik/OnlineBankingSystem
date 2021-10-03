import React, { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router";
import Nav from "../NavBar/Nav";
import Sidebar from "../SideBarCLerk/Sidebar";
import "./Datatables.css";
export default function Querryclerk() {
  const [qdetails, setdetails] = useState({});
  const history = useHistory();

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
    fetch("/cquerr", {
      method: "get",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setdetails(data.list);
        }
      });
  }, []);

  const gotoDetails = (id) => {
    history.push(`/AnswerQuerryclerk/${id}`);
  };

  return (
    <div className="QuerryClerk">
      <Nav />
      <Sidebar />
      <div class="container">
        <h3>Customer Querries</h3>
        <div class="row">
          <table
            id="example"
            class="table table-striped table-bordered"
            style={{ width: "100%" }}
          >
            <thead>
              <tr>
                <th scope="col">Querry No</th>
                <th scope="col  ">Account No</th>
                <th scope="col  ">Username</th>
                <th scope="col ">mail</th>
                <th scope="col ">phone</th>
                <th scope="col ">Querry</th>
                <th scope="col ">action</th>
              </tr>
            </thead>
            <tbody>
              {qdetails.length > 0
                ? qdetails.map((cquerr) => {
                    console.log(cquerr);
                    return (
                      <tr>
                        <th scope="row">{cquerr.QueryNO}</th>
                        <td>{cquerr.Accountno}</td>
                        <td>{cquerr.Username}</td>
                        <td>{cquerr.mail}</td>
                        <td>{cquerr.phone}</td>
                        <td>{cquerr.Querry}</td>

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
                                gotoDetails(cquerr.QueryNO);
                              }}
                            >
                              Answer
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
  );
}
