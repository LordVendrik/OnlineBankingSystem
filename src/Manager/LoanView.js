// Customer Apply for loan (view data)  //

import React, { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router";
import "./LoanView.css";
import Sidebar from "../SideBarManager/Sidebar";
import Nav from "../NavBar/Nav";

export default function LoanView(props) {
  const id = props.match.params.LoanId;
  const [loanData, setformData] = useState({});
  const [productdata, setproductdata] = useState({});
  const [customerdata, setcustomerdata] = useState({});
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
        } else if (data.message !== "Manager") {
          history.push("/wrongPage");
        }
      });
  }, []);

  useEffect(() => {
    fetch(`/loanDetails/${id}`, {
      method: "get",
    })
      .then((res) => res.json())
      .then((data) => {
        setformData(data.data);
        setproductdata(data.productdata);
        setcustomerdata(data.customerdata);
      });
  }, []);

  const ApproveLoan = () => {
    const data = {
      accountno: loanData.accountno,
      productid: productdata.productid,
      Amount: loanData.Wantloan,
      duration: loanData.Howlong,
      date:
        new Date().getFullYear() +
        "-" +
        (new Date().getMonth() + 1 < 10
          ? "0" + (new Date().getMonth() + 1)
          : new Date().getMonth() + 1) +
        "-" +
        (CurrentDate < 10 ? "0" + CurrentDate : CurrentDate),
    };

    fetch(`/approveLoan/${loanData.LoanId}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        accepts: "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          history.push("/ManagerLoanList");
        } else {
          console.log("not submitted");
        }
      });
  };

  const ApproveCard = () => {
    console.log("Card");
  };

  const DeclineAccount = (id) => {
    fetch(`/removeRequest/${id}`, {
      method: "get",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          history.push("/ManagerLoanList");
        }
      });
  };

  return (
    <div>
      {" "}
      <Nav />
      <Sidebar />
      <div className="LoanView">
        <div className="pageborder">
          <div>
            <img
              src="https://assets.entrepreneur.com/content/3x2/2000/20200406144106-GettyImages-1023100020.jpeg"
              width="225"
              align="left"
            />
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoBPvY02b5N4m6i1f2mMstD1aM8h5FWwcdFg&usqp=CAU"
              width="263"
              align="right"
            />
          </div>

          <div className="box2">
            <h1 align="center">
              <strong className="shadow">
                <u> Application for Loan </u>
              </strong>
            </h1>
            <h6 align="center"> Customer filled form for Loan </h6>
          </div>
          <div className="box3">
            <div className="row">
              <div className="col-xl-6 col-md-6">
                <div>
                  <div>Loan Type : {productdata.productType}</div>
                </div>
                <br />
                <div>
                  <div>Account Type : {loanData.AccountType}</div>
                </div>
                <br />
                <div className="box">
                  <h3> Personal Details: </h3> <br />
                  <div>
                    <div>Account No : {loanData.accountno}</div>
                  </div>
                  <br />
                  <div>
                    <div>Product Type : {loanData.productType}</div>
                  </div>
                  <br />
                  <div>
                    <div>First Name : {loanData.firstName}</div>
                  </div>
                  <br />
                  <div>
                    <div>Middle Name : {loanData.Middlename}</div>
                  </div>
                  <br />
                  <div>
                    <div>Last Name : {loanData.Lastname}</div>
                  </div>
                  <br />
                  <div>
                    <div>Date of Birth : {loanData.DOB}</div>
                  </div>
                  <br />
                  <div>
                    <div>Email Id : {loanData.Emailid}</div>
                  </div>
                  <br />
                  <div>
                    <div>Mobile No : {loanData.Mobileno}</div>
                  </div>
                  <br />
                  <div>
                    <div>Aadhaar no : {loanData.Aadhaarno}</div>
                  </div>
                  <br />
                  <div>
                    <div>PAN card : {loanData.Pancardno}</div>
                  </div>
                  <br />
                  <div>
                    <div>Address : {loanData.Address}</div>
                  </div>
                  <br />
                  <div>
                    <div>City/Town : {loanData.City}</div>
                  </div>
                  <br />
                  <div>
                    <div>State : {loanData.State}</div>
                  </div>
                  <br />
                  <div>
                    <div>Pincode : {loanData.Pincode}</div>
                  </div>
                  <br />
                  <div>
                    <div>Income source : {loanData.Incomesource}</div>
                  </div>
                  <br />
                  <div>
                    <div>Annual Income Amount : {loanData.Annualincome}</div>
                  </div>
                  <br />
                  {loanData.productType === "Loan" ? (
                    <div>
                      <div>
                        <div>
                          How much would you like to borrow :{" "}
                          {loanData.Wantloan}
                        </div>
                      </div>
                      <br />
                      <div>
                        <div>For how long : {loanData.Howlong}</div>
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <div className="col-xl-6 col-md-6">
                <div className="mb-5">
                  <div>Photo : </div>
                  {customerdata.photo !== undefined ? (
                    <img
                      className="img2"
                      src={`/image/${customerdata.photo}`}
                      alt=""
                    ></img>
                  ) : (
                    "loading"
                  )}
                </div>

                <div className="mb-5">
                  <div>AadharCard : </div>
                  {customerdata.adharcardPhoto !== undefined ? (
                    <img
                      className="img"
                      src={`/image/${customerdata.adharcardPhoto}`}
                      alt=""
                    ></img>
                  ) : (
                    "loading"
                  )}
                </div>
              </div>
              <div className="centered">
                <button
                  className="btn btn-success btn-lg mx-1"
                  onClick={() => {
                    console.log(productdata.productType);
                    if (loanData.productType == "Loan") {
                      ApproveLoan();
                    } else {
                      ApproveCard();
                    }
                  }}
                >
                  Approve
                </button>
                <button
                  className="btn btn-danger btn-lg mx-1"
                  onClick={() => {
                    DeclineAccount(loanData.LoanId);
                  }}
                >
                  Decline
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
