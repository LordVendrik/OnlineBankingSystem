import React from "react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Nav from "../NavBar/Nav";
import Sidebar from "../SideBarManager/Sidebar";

import "./Datatables.css";

export default function Transaction() {
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
        } else if (data.message !== "Manager") {
          history.push("/wrongPage");
        }
      });
  }, []);

  useEffect(() => {
    fetch("/transactionsManagerr", {
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

  const godata = () => {
    const newarr = [];
    const id = document.getElementById("s3").value;
    console.log(id);
    for (let i = 0; i < newTransactionlist.length; i++) {
      if (newTransactionlist[i].date === id) {
        newarr.push(newTransactionlist[i]);
      }
    }
    setnewTransactionlist(newarr);
  };

  const godata2 = () => {
    const newarr = [];
    const id = parseInt(document.getElementById("s2").value);
    console.log(id);
    for (let i = 0; i < newTransactionlist.length; i++) {
      if (newTransactionlist[i].transferedto == id) {
        newarr.push(newTransactionlist[i]);
      }
    }
    setnewTransactionlist(newarr);
  };

  const godata3 = () => {
    const newarr = [];
    const id = parseInt(document.getElementById("s1").value);
    console.log(id);
    for (let i = 0; i < newTransactionlist.length; i++) {
      if (newTransactionlist[i].transferfrom == id) {
        newarr.push(newTransactionlist[i]);
      }
    }
    setnewTransactionlist(newarr);
  };

  return (
    <div>
      <Nav />
      <Sidebar />
      <div>
        <div className="container">
          <h3>Trasactions</h3>
          <div className="row">
            <div class="col-md-2 ">
              {" "}
              <label htmlFor="first_name">Search by Date</label>
              <input type="text" class="form-control" id="s3" />
            </div>
            <div class=" col-md-2">
              <label htmlFor="last_name"></label>
              <label htmlFor="last_name"></label>
              <label htmlFor="last_name"></label>
              <br />
              <button
                type="submit"
                class="btn btn-primary"
                onClick={() => {
                  godata();
                }}
              >
                search
              </button>
            </div>
            <div class="col-md-2 ">
              {" "}
              <label htmlFor="first_name"> BeneficiaryAccountno</label>
              <input
                type="text"
                placeholder="accountno"
                class="form-control"
                id="s2"
              />
            </div>
            <div class=" col-md-2">
              <label htmlFor="last_name"></label>
              <label htmlFor="last_name"></label>
              <label htmlFor="last_name"></label>
              <br />
              <button
                type="submit"
                class="btn btn-primary"
                onClick={() => {
                  godata2();
                }}
              >
                search
              </button>
            </div>

            <div class="col-md-2 ">
              {" "}
              <label htmlFor="first_name"> TransferFromAccountno</label>
              <input
                type="text"
                placeholder="accountno"
                class="form-control"
                id="s1"
              />
            </div>
            <div class=" col-md-2">
              <label htmlFor="last_name"></label>
              <label htmlFor="last_name"></label>
              <label htmlFor="last_name"></label>
              <br />
              <button
                type="submit"
                class="btn btn-primary"
                onClick={() => {
                  godata3();
                }}
              >
                search
              </button>
            </div>
          </div>

          <div className="row">
            <table className="table table-striped table-hover table-bordered  ">
              <thead>
                <tr>
                  <th scope="col-hover">Transaction ID</th>
                  <th scope="col  ">TransferFrom Accountno</th>
                  <th scope="col  ">Beneficiary Account no</th>
                  <th scope="col ">Beneficiary IFSC Code</th>
                  <th scope="col ">Amount</th>
                  <th scope="col ">Date</th>
                  <th scope="col ">Time</th>
                </tr>
              </thead>
              <tbody>
                {newTransactionlist.length > 0
                  ? newTransactionlist.map((transaction) => {
                      console.log(transaction);
                      return (
                        <tr key={transaction.transaction_id}>
                          <th scope="row">{transaction.Transaction_ID}</th>
                          <td>{transaction.transferfrom}</td>
                          <td>{transaction.transferedto}</td>
                          <td>{transaction.ifsccode}</td>
                          <td>{transaction.amount}</td>
                          <td>{transaction.date}</td>
                          <td>{transaction.time}</td>
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
