import React from "react";
import { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router";
import Nav from "../NavBar/Nav";
import Sidebar from "../SideBar/Sidebar";
import "./fundtransfer.css";
import { userContext } from "../App";

export default function FundTransfer() {
  const [transactionDetails, settransactionDetails] = useState({
    BankType: "same",
  });
  const { state } = useContext(userContext);
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

  const ReuqestTransfer = () => {
    date =
      new Date().getFullYear() +
      "-" +
      (new Date().getMonth() + 1 < 10
        ? "0" + (new Date().getMonth() + 1)
        : new Date().getMonth() + 1) +
      "-" +
      new Date().getDate();

    time = new Date().getHours() + ":" + new Date().getMinutes();

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
          setmessage("error");
        } else {
          console.log(data.message);
          setmessage("successful");
        }

        window.scrollTo(0, 0);
      });
  };

  return (
    <div>
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
                  <p>{state ? state.Amount : "loading"}</p>
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
                    type="text"
                    placeholder="Beneficiary Account Number"
                    name="Beneficiary Account Number"
                    required
                    onChange={(e) => {
                      settransactionDetails({
                        ...transactionDetails,
                        beneficiaryaccountnumber: e.target.value,
                      });
                    }}
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
                    type="text"
                    placeholder="Enter the Beneficiary Account Number"
                    name="Beneficiary Account Number"
                    required
                    onChange={(e) => {
                      settransactionDetails({
                        ...transactionDetails,
                        Confirmbeneficiaryaccountnumber: e.target.value,
                      });
                    }}
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
                    />
                  </div>
                </div>
                <div className="col-xs-12 col-md-6 col-lg-6">
                  <div>
                    <label htmlFor="remarks">
                      <b>Same Bank or Different :</b>
                    </label>{" "}
                    <br />
                    <select
                      className="pos4"
                      onChange={(e) => {
                        settransactionDetails({
                          ...transactionDetails,
                          BankType: e.target.value,
                        });
                      }}
                    >
                      <option value="same">Same</option>
                      <option value="diff">Different</option>
                    </select>
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
