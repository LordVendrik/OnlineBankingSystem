import React from "react";
import { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router";
import Nav from "../NavBar/Nav";
import Sidebar from "../SideBar/Sidebar";
import "./fundtransfer.css";
import { userContext } from "../App";

export default function FundTransfer() {
  const [transactionDetails, settransactionDetails] = useState({});
  const { state } = useContext(userContext);
  const [success, setsuccess] = useState("");
  const [style, setstyle] = useState("");
  const history = useHistory();
  const [message, setmessage] = useState("");
  let date;
  let time;

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

  const transferValidations = () => {
    for (let i = 1; i < 7; i++) {
      if (document.getElementById(`field${i}`).value == "") {
        document.getElementById(`field${i}`).style.border = "2px solid red";
        document.getElementById(`field${i}`).scrollIntoView();
        return false;
      } else {
        document.getElementById(`field${i}`).style.border = "";
      }
    }

    if (
      document.getElementById("field2").value !==
      document.getElementById("field3").value
    ) {
      document.getElementById(`field2`).style.border = "2px solid red";
      document.getElementById(`field3`).style.border = "2px solid red";
      alert("Please fill same ACcount Number");
      return false;
    } else {
      document.getElementById(`field2`).style.border = "";
      document.getElementById(`field3`).style.border = "";
    }

    if (document.getElementById("field4").value >= state.Amount) {
      document.getElementById(`field4`).style.border = "2px solid red";
      alert("Amount Exceeded Current Available Amount");
      return false;
    } else {
      document.getElementById(`field4`).style.border = "";
    }

    return true;
  };

  const ReuqestTransfer = () => {
    const CurrentDate = new Date().getDate();
    const CurrentMinutes = new Date().getMinutes();
    const CurrentHour = new Date().getHours();
    date =
      new Date().getFullYear() +
      "-" +
      (new Date().getMonth() + 1 < 10
        ? "0" + (new Date().getMonth() + 1)
        : new Date().getMonth() + 1) +
      "-" +
      (CurrentDate < 10 ? "0" + CurrentDate : CurrentDate);

    time =
      (CurrentHour < 10 ? "0" + CurrentHour : CurrentHour) +
      ":" +
      (CurrentMinutes < 10 ? "0" + CurrentMinutes : CurrentMinutes);

    if (!transferValidations()) {
      return;
    }

    console.log({
      ...transactionDetails,
      date: date,
      time: time,
      transferfrom: state.Accountno,
    });

    fetch("/transactionRequest", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        accepts: "application/json",
      },
      body: JSON.stringify({
        ...transactionDetails,
        date: date,
        time: time,
        transferfrom: state.Accountno,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
          setmessage(data.error);
          setsuccess(
            "https://thumbs.dreamstime.com/b/flat-raster-wrong-icon-symbol-isolated-white-background-168810889.jpg"
          );
          setstyle("text-danger");
        } else {
          console.log(data.message);
          setmessage("successful");
          setsuccess(
            "https://thumbs.dreamstime.com/b/tick-mark-icon-flat-illustration-check-mark-vector-tick-mark-icon-flat-illustration-check-mark-vector-164317151.jpg"
          );
          setstyle("text-success");
        }

        window.scrollTo(0, 0);
      });
  };

  return (
    <div>
      <div>
        {message === "" ? (
          <div></div>
        ) : (
          <div className="filter">
            <div className="modal2 redirectbutton">
              <div className="modal-content">
                <div>
                  <img src={success} width="100px"></img>
                </div>
                <div className="modal-body">
                  <p className={style}>{message ? message : ""}</p>
                </div>
                <div className="redirectbutton">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                      history.push("/customerDashboard");
                    }}
                  >
                    Redirect TO Dashboard
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Nav />
      <Sidebar />
      <div className="Fund">
        <div>
          <header>
            <h2>Money Transfer</h2>
          </header>
          <section>
            <div className="form">
              <h3 className="message">
                {message ? (
                  message == "error" ? (
                    <b className="text-danger">not submitted error occured</b>
                  ) : (
                    <b className="text-success">Successfully requested</b>
                  )
                ) : (
                  ""
                )}
              </h3>
              <div>
                <label htmlFor="Beneficiary Name">
                  <b>
                    Transfer Date and Time :<sup>*</sup>{" "}
                  </b>
                </label>
                <br />
                <input
                  className="pos4"
                  type="text"
                  value={new Date()}
                  name="Beneficiary Name"
                  disabled
                  required
                />
              </div>
              {/* <input type="datetime-local" id="date-time" name="date" value="14-05-1996 08:08"/> */}
              <div className="row">
                <div className="col-xs-12 col-md-6 col-lg-6">
                  <label htmlFor="Beneficiary Name">
                    <b>
                      Beneficiary Name :<sup>*</sup>{" "}
                    </b>
                  </label>
                  <br />
                  <input
                    className="pos4"
                    type="text"
                    placeholder="Enter the Beneficiary Name"
                    name="Beneficiary Name"
                    id="field1"
                    required
                    onChange={(e) => {
                      settransactionDetails({
                        ...transactionDetails,
                        beneficiaryname: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="col-xs-12 col-md-6 col-lg-6">
                  <label>
                    <b>
                      Available Balance :<span id="Balance"></span>
                    </b>
                  </label>
                  <p id="amount">{state ? state.Amount : "loading"}</p>
                </div>
              </div>

              <div className="row">
                <div className="col-xs-12 col-md-6 col-lg-6">
                  <label htmlFor="Beneficiary Account Number">
                    <b>
                      Beneficiary Account Number :<sup>*</sup>{" "}
                    </b>
                  </label>
                  <input
                    className="pos4"
                    type="number"
                    placeholder="Beneficiary Account Number"
                    name="Beneficiary Account Number"
                    required
                    onChange={(e) => {
                      settransactionDetails({
                        ...transactionDetails,
                        beneficiaryaccountnumber: e.target.value,
                      });
                    }}
                    id="field2"
                  />
                </div>

                <div className="col-xs-12 col-md-6 col-lg-6">
                  <label htmlFor="Confirm Beneficiary Account Number">
                    <b>
                      Confirm Beneficiary Account Number :<sup>*</sup>{" "}
                    </b>
                  </label>
                  <input
                    className="pos4"
                    type="number"
                    placeholder="Enter the Beneficiary Account Number"
                    name="Beneficiary Account Number"
                    required
                    onChange={(e) => {
                      settransactionDetails({
                        ...transactionDetails,
                        Confirmbeneficiaryaccountnumber: e.target.value,
                      });
                    }}
                    id="field3"
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-xs-12 col-md-6 col-lg-6">
                  <label htmlFor="Amount">
                    <b>
                      Amount :<sup>*</sup>{" "}
                    </b>
                  </label>{" "}
                  <br />
                  <input
                    className="pos4"
                    type="number"
                    placeholder="Enter the amount"
                    name="amount"
                    min="1"
                    max="50000"
                    required
                    onChange={(e) => {
                      settransactionDetails({
                        ...transactionDetails,
                        amount: e.target.value,
                      });
                    }}
                    id="field4"
                  />
                </div>
                <div className="col-xs-12 col-md-6 col-lg-6">
                  <label htmlFor="Beneficiary IFSC Code">
                    <b>
                      Beneficiary IFSC Code :<sup>*</sup>{" "}
                    </b>
                  </label>{" "}
                  <br />
                  <input
                    className="pos4"
                    type="text"
                    placeholder="Beneficiary IFSC Code"
                    name="Beneficiary IFSC Code"
                    required
                    onChange={(e) => {
                      settransactionDetails({
                        ...transactionDetails,
                        beneficiaryifsccode: e.target.value,
                      });
                    }}
                    id="field5"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12 col-md-6 col-lg-6">
                  <div>
                    <label htmlFor="remarks">
                      <b>Remarks :</b>
                    </label>{" "}
                    <br />
                    <input
                      className="pos4"
                      type="text"
                      name="Remarks"
                      onChange={(e) => {
                        settransactionDetails({
                          ...transactionDetails,
                          remarks: e.target.value,
                        });
                      }}
                      id="field6"
                    />
                  </div>
                </div>
              </div>

              <div className="footer">
                <p>
                  Credit will be effected based solely on the beneficiafy
                  account number.
                </p>
                <p>
                  Fund transfer from NRO account to NRE account is not
                  permitted.
                </p>
                <p>You can transfer upto RS. 50000 per transcation. </p>
                <p>
                  next transacton on the same account can be made only after 15
                  minutes.
                </p>
              </div>
              <div className="align-right">
                <button
                  className="btn"
                  onClick={() => {
                    ReuqestTransfer();
                  }}
                >
                  Continue
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
