import React, { useContext } from "react";
import { userContext } from "../App";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import "./CustomerDashboard.css";
import Nav from "../NavBar/Nav";
import Sidebar from "../SideBar/Sidebar";
import "./update2.css";

function CustomerDashboard() {
  const { state } = useContext(userContext);
  const [show, setshowdata] = useState(false);
  const history = useHistory();
  const [showBalance, setshowBalance] = useState(false);
  const [transactionsList, settransactionsList] = useState([]);

  const [Qdata, setqdata] = useState();

  const [sh, setshow] = useState(false);
  const [sentQuery, setsentQuery] = useState("");

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

  useEffect(() => {
    setqdata({
      Accountno: state ? state.Accountno : "",
      Username: state ? state.Username : "",
      ...Qdata,
    });
  }, [state]);

  const sendQuerry = () => {
    for (let i = 1; i < 4; i++) {
      if (document.getElementById(`query${i}`).value === "") {
        document.getElementById(`query${i}`).style.border = "2px solid red";
        document.getElementById(`query${i}`).scrollIntoView();
        return;
      } else {
        document.getElementById(`query${i}`).style.border = "";
      }
    }

    fetch("/sback", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        accepts: "application/json",
      },

      body: JSON.stringify(Qdata),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setsentQuery(data.error);
        } else {
          setsentQuery(data.message);
        }
      });

    setTimeout(() => {
      setsentQuery("");
    }, 3000);
  };

  const showbalance = () => {
    setshowBalance(true);
  };

  const RequestDelete = () => {
    const data = {
      Accountno: state.Accountno,
      firstname: state.firstName,
      lastname: state.lastName,
    };

    fetch("/requestDeletion", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        accepts: "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          alert("request successfully made");
        }
      });
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

  return (
    <div>
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
                setshowdata(!show);
                requrestTransactions();
              }}
            >
              <h3>Show last 10 Transaction History</h3>
            </a>
          </div>
          {show ? (
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
        <div className="center">
          {" "}
          <button
            className="btn btn-danger my-5"
            onClick={() => {
              RequestDelete();
            }}
          >
            Request Deletion
          </button>
        </div>
      </div>

      <div className="querySend">
        <div className="fixthepos">
          {sh ? (
            <div className="container ">
              <div id="contactus" action="" method="post">
                <h3>Customer Query</h3>
                <input
                  placeholder="Account no"
                  type="number"
                  value={state.Accountno}
                  disabled
                  required
                  autoFocus
                ></input>
                <input
                  placeholder="Username"
                  type="text"
                  value={state.Username}
                  disabled
                  required
                  autoFocus
                ></input>
                <input
                  placeholder="Email Address"
                  type="email"
                  onChange={(e) => {
                    setqdata({ ...Qdata, mail: e.target.value });
                  }}
                  id="query1"
                  required
                ></input>
                <input
                  placeholder="Phone Number"
                  type="number"
                  onChange={(e) => {
                    setqdata({ ...Qdata, Phone: e.target.value });
                  }}
                  id="query2"
                  required
                ></input>

                <textarea
                  placeholder="Type your Querry here..."
                  onChange={(e) => {
                    setqdata({ ...Qdata, Querry: e.target.value });
                  }}
                  id="query3"
                  required
                ></textarea>
                <button
                  name="submit"
                  type="submit"
                  id="contactus-submit"
                  onClick={() => {
                    sendQuerry();
                  }}
                >
                  Submit
                </button>
                <h4>
                  <p className="text-success">{sentQuery}</p>
                </h4>
              </div>
            </div>
          ) : null}
          <button id="buttonswq" className="btn" onClick={() => setshow(!sh)}>
            <img src="https://img.icons8.com/fluency/48/000000/feedback-hub.png"></img>
          </button>
        </div>
      </div>
    </div>
  );
}
export default CustomerDashboard;
