import React, { useState } from "react";
import "./clerk.css";
import "./forms.css";
import { useEffect } from "react";
import { useHistory } from "react-router";
import Nav from "../NavBar/Nav";
import Sidebar from "../SideBarCLerk/Sidebar";

export default function ViewDetailedTransactionRequest(props) {
  const id = props.match.params.id;
  const [details, setdetails] = useState({});
  const [url, seturl] = useState("approveTransactionSame");
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

    fetch(`/transationDetails/${id}`, {
      method: "get",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          history.push("/login");
        } else {
          setdetails(data.details);
          console.log(data.details);
        }
      });
  }, []);

  const DeclineAccount = (id) => {
    fetch(`/declineTransaction/${id}`, {
      method: "get",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          console.log(data.message);
          history.push("/approveTransactions");
        }
      });
  };

  const ApproveAccount = (id) => {
    fetch(`/${url}/${id}`, {
      method: "get",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("working" + data);
        if (data.error) {
          console.log(data.error);
        } else {
          console.log(data.message);
          history.push("/approveTransactions");
        }
      });
  };

  return (
    <div>
      <Nav />
      <Sidebar />
      <div className="apply2">
        <div className="form">
          <header className="headres">
            <h1 className="heading">Details</h1>
          </header>
          <div className="container-fluid">
            <div className="row mt-4">
              <div className="col-xl-6 col-md-12">
                <div className="row mt-5">
                  {" "}
                  <div className="col">
                    {" "}
                    <h3 className="labels">Sender Details:</h3>
                  </div>
                </div>

                <div className="row mt-3">
                  {" "}
                  <div className="col">
                    {" "}
                    <label className="labels">Sender Name:</label>
                  </div>
                </div>
                <div className="row">
                  <div>
                    {details.sender
                      ? details.sender.firstname + " " + details.sender.lastname
                      : ""}
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <label className="labels">Aadharno:</label>
                  </div>
                </div>
                <div className="row">
                  <div>{details.sender ? details.sender.aadharno : ""}</div>
                </div>
                <div className="row">
                  <div className="col">
                    <label className="labels">Pancard no:</label>
                  </div>
                </div>
                <div className="row">
                  <div>{details.sender ? details.sender.pancardno : ""}</div>
                </div>
                <div className="row">
                  <div className="col">
                    <label className="labels">Total Amount:</label>
                  </div>
                </div>
                <div className="row">
                  <div>{details.sender ? details.sender.Amount : ""}</div>
                </div>
                <div className="row">
                  <div className="col">
                    <label className="labels">Email:</label>
                  </div>
                </div>
                <div className="row">
                  <div>{details.sender ? details.sender.Emailid : ""}</div>
                </div>
                <div className="row">
                  <div className="col">
                    <label className="labels"> Primary Mobile no:</label>
                  </div>
                </div>
                <div className="row">
                  <div>{details.sender ? details.sender.phoneno : ""}</div>
                </div>
              </div>
              <div className="col-xl-6 col-md-12" id="c2">
                <div className="row mt-5">
                  {" "}
                  <div className="col">
                    {" "}
                    <h3 className="labels">Transfer Request Details:</h3>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="row">
                    {" "}
                    <div className="col">
                      {" "}
                      <label className="labels">Transaction ID:</label>
                    </div>
                  </div>
                  <div className="row">
                    <div>
                      {details.transaction
                        ? details.transaction.transaction_id
                        : ""}
                    </div>
                  </div>
                </div>
                <div className="row">
                  {" "}
                  <div className="col">
                    {" "}
                    <label className="labels">Same or Different Bank:</label>
                  </div>
                </div>
                <div className="row">
                  <div>
                    {details.transaction ? details.transaction.BankType : ""}
                  </div>
                </div>
                <div className="row">
                  {" "}
                  <div className="col">
                    {" "}
                    <label className="labels">Beneficiary Name:</label>
                  </div>
                </div>
                <div className="row">
                  <div>
                    {details.transaction
                      ? details.transaction.beneficiaryname
                      : ""}
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <label className="labels">Beneficiary Account No:</label>
                  </div>
                </div>
                <div className="row">
                  <div>
                    {details.transaction
                      ? details.transaction.beneficiaryaccountno
                      : ""}
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <label className="labels">Beneficiary IFSC Code:</label>
                  </div>
                </div>
                <div className="row">
                  <div>
                    {details.transaction
                      ? details.transaction.beneficiaryifsccode
                      : ""}
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <label className="labels">Amount To be Transfered:</label>
                  </div>
                </div>
                <div className="row">
                  <div>
                    {details.transaction ? details.transaction.amount : ""}
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <label className="labels">Remarks:</label>
                  </div>
                </div>
                <div className="row">
                  <div>
                    {details.transaction ? details.transaction.remarks : ""}
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <label className="labels"> Date:</label>
                  </div>
                </div>
                <div className="row">
                  <div>
                    {details.transaction ? details.transaction.date : ""}
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <label className="labels"> Time:</label>
                  </div>
                </div>
                <div className="row">
                  <div>
                    {details.transaction ? details.transaction.time : ""}
                  </div>
                </div>
              </div>

              {details.transaction && details.transaction.BankType == "same" ? (
                <div className="col-xl-6 col-md-12" id="c2">
                  <div className="row mt-4">
                    {" "}
                    <div className="col">
                      {" "}
                      <h3 className="labels">Receiver Details:</h3>
                    </div>
                  </div>
                  <div className="row mt-4">
                    {" "}
                    <div className="col">
                      {" "}
                      <label className="labels">Receiver Name:</label>
                    </div>
                  </div>
                  <div className="row">
                    <div>
                      {details.Receiver
                        ? details.Receiver.firstname +
                          " " +
                          details.Receiver.lastname
                        : ""}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <label className="labels">Receiver Account No:</label>
                    </div>
                  </div>
                  <div className="row">
                    <div>
                      {details.Receiver ? details.Receiver.Accountno : ""}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <label className="labels">Aadharno:</label>
                    </div>
                  </div>
                  <div className="row">
                    <div>
                      {details.Receiver ? details.Receiver.aadharno : ""}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <label className="labels">Account Type:</label>
                    </div>
                  </div>
                  <div className="row">
                    <div>
                      {details.Receiver ? details.Receiver.AccountType : ""}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <label className="labels"> Mobile no:</label>
                    </div>
                  </div>
                  <div className="row">
                    <div>
                      {details.Receiver ? details.Receiver.phoneno : ""}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <label className="labels"> Pancard No:</label>
                    </div>
                  </div>
                  <div className="row">
                    <div>
                      {details.Receiver ? details.Receiver.pancardno : ""}
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>

            <div className="row">
              <div className="col buttons">
                <button
                  className="btn btn-success mx-4"
                  onClick={() => {
                    ApproveAccount(details.transaction.transaction_id);
                  }}
                >
                  Approve
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    DeclineAccount(details.transaction.transaction_id);
                  }}
                >
                  Decline
                </button>
              </div>
            </div>
          </div>
          <div>
            <small className="vs">&copy; Application form for VCB,2021. </small>
          </div>
        </div>
      </div>
    </div>
  );
}
