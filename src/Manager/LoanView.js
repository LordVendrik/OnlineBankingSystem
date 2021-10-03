// Customer Apply for loan (view data)  //

import React, { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router";
import "./LoanView.css";
import Sidebar from "../SideBarManager/Sidebar";
import Nav from "../NavBar/Nav";
import hcbgImage from "./hcbg.jpg";

export default function LoanView(props) {
  const id = props.match.params.LoanId;
  const [loanData, setformData] = useState({});
  const [productdata, setproductdata] = useState({});
  const [customerdata, setcustomerdata] = useState({});
  const [reason, setReason] = useState("");
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
    const CurrentDate = new Date().getDate();
    const data = {
      accountno: loanData.accountno,
      productid: productdata.productid,
      Amount: loanData.loanamount,
      Date:
        new Date().getFullYear() +
        "-" +
        (new Date().getMonth() + 1 < 10
          ? "0" + (new Date().getMonth() + 1)
          : new Date().getMonth() + 1) +
        "-" +
        (CurrentDate < 10 ? "0" + CurrentDate : CurrentDate),
      timeRemaining: loanData.timeRemaining,
    };

    fetch(`/approveLoan/${loanData.LoanId}/${loanData.Emailid}`, {
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

    alert("work in progress dont click anywhere!!!! after pressing OK");
  };

  const DeclineLoan = (id) => {
    if (document.getElementById("reason").value === "") {
      document.getElementById("reason").style.border = "2px solid red";
      document.getElementById("reason").scrollIntoView();
      alert("Cannot Delete without reason");
      return;
    } else {
      document.getElementById("reason").style.border = "";
    }

    fetch(`/removeRequest/${id}/${loanData.Emailid}/${reason}`, {
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
    alert("work in progress dont click anywhere!!!! after pressing OK");
  };

  return (
    <div className="ViewDetailedRequest">
      <Nav />
      <Sidebar />
      <div
        class="container"
        class="bg_image"
        style={{
          backgroundImage: "url(" + hcbgImage + ")",
          backgroundSize: "cover",
        }}
      >
        <div class="row">
          <div class="col-md-8 col-md-offset-2">
            <div className="form">
              <h2 class="text-center"> DETAILS</h2>
              <hr />

              <legend>Personal Details</legend>

              <fieldset>
                <div class="form-group col-md-6">
                  <label htmlFor="Account-Type">Account No</label>
                  <div>{loanData ? loanData.accountno : ""}</div>
                </div>

                <div class="form-group col-md-6">
                  <label htmlFor="Account-Type">Name</label>
                  <div>
                    {customerdata
                      ? customerdata.firstname + " " + customerdata.lastname
                      : ""}
                  </div>
                </div>
                <div class="form-group col-md-6">
                  <label className="labels">Aadhar No</label>
                  <div>{customerdata ? customerdata.aadharno : ""}</div>
                </div>

                <div class="form-group col-md-6">
                  <label htmlFor="first_name">PanCard no</label>
                  <div>{customerdata ? customerdata.pancardno : ""}</div>
                </div>

                <div class="form-group  col-md-6">
                  <label htmlFor="last_name">Total Account Balance</label>
                  <div>{customerdata ? customerdata.Amount : ""}</div>
                </div>

                <div class="form-group col-md-6">
                  <label htmlFor="UserName">Email Id</label>
                  <div>{customerdata ? customerdata.Emailid : ""}</div>
                </div>

                <div class="form-group col-md-6">
                  <label htmlFor="confirm_password"> Mobile No</label>
                  <div>{customerdata ? customerdata.phoneno : ""}</div>
                </div>
              </fieldset>

              <hr />

              <legend>Financial Details</legend>

              <fieldset>
                <div class="form-group col-md-6">
                  <label htmlFor="BirthDate">Loan Id</label>
                  <div> {loanData ? loanData.LoanId : ""}</div>
                </div>

                <div class="form-group col-md-6">
                  <label htmlFor="AdharCardNo">Loan Type</label>
                  <div>{loanData ? loanData.LoanType : ""}</div>
                </div>
                <div class="form-group col-md-6">
                  <label htmlFor="Pan Card No">Annual Income</label>
                  <div>{loanData ? loanData.AnnualIncome : ""}</div>
                </div>

                <div class="form-group col-md-6">
                  <label htmlFor="Initial Amount"> Income Source</label>
                  <div>{loanData ? loanData.incomesource : ""}</div>
                </div>
                <div class="form-group col-md-6">
                  <label htmlFor="Gender">Loan Amount</label>
                  <div>{loanData ? loanData.loanamount : ""}</div>
                </div>
              </fieldset>

              <hr />

              <legend>Income Proof</legend>
              <fieldset>
                {loanData.incomeproofphoto ? (
                  <img
                    src={`/image/${loanData.incomeproofphoto + ".jpg"}`}
                    width="400px"
                  />
                ) : (
                  ""
                )}
              </fieldset>

              <hr />

              <legend>Reason</legend>

              <div class="form-group">
                <textarea
                  className="form-control"
                  id="reason"
                  onChange={(e) => {
                    setReason(e.target.value);
                  }}
                ></textarea>
              </div>

              <fieldset>
                <div class="form-group">
                  <div class="col-md-12">
                    <div class="checkbox"></div>
                  </div>
                </div>

                <div class="form-group centered">
                  <div class="col-md-12">
                    <button
                      type="submit"
                      class="btn btn-primary mx-5"
                      onClick={() => {
                        ApproveLoan(loanData.LoanId);
                      }}
                    >
                      Approve
                    </button>
                    <button
                      type="submit"
                      class="btn btn-danger mx-5"
                      onClick={() => {
                        DeclineLoan(loanData.LoanId);
                      }}
                    >
                      Decline
                    </button>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>
      </div>
    </div>

    // <div>
    //   {" "}
    //   <Nav />
    //   <Sidebar />
    //   <div className="LoanView">
    //     <div className="pageborder">
    //       <div>
    //         <img
    //           src="https://assets.entrepreneur.com/content/3x2/2000/20200406144106-GettyImages-1023100020.jpeg"
    //           width="225"
    //           align="left"
    //         />
    //         <img
    //           src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoBPvY02b5N4m6i1f2mMstD1aM8h5FWwcdFg&usqp=CAU"
    //           width="263"
    //           align="right"
    //         />
    //       </div>

    //       <div className="box2">
    //         <h1 align="center">
    //           <strong className="shadow">
    //             <u> Application for Loan </u>
    //           </strong>
    //         </h1>
    //         <h6 align="center"> Customer filled form for Loan </h6>
    //       </div>
    //       <div className="box3">
    //         <div className="row">
    //           <div className="col-xl-6 col-md-6">
    //             <div>
    //               <div>Loan Type : {productdata.productType}</div>
    //             </div>
    //             <br />
    //             <div>
    //               <div>Account Type : {loanData.AccountType}</div>
    //             </div>
    //             <br />
    //             <div className="box">
    //               <h3> Personal Details: </h3> <br />
    //               <div>
    //                 <div>Account No : {loanData.accountno}</div>
    //               </div>
    //               <br />
    //               <div>
    //                 <div>Product Type : {loanData.productType}</div>
    //               </div>
    //               <br />
    //               <div>
    //                 <div>First Name : {loanData.firstName}</div>
    //               </div>
    //               <br />
    //               <div>
    //                 <div>Middle Name : {loanData.Middlename}</div>
    //               </div>
    //               <br />
    //               <div>
    //                 <div>Last Name : {loanData.Lastname}</div>
    //               </div>
    //               <br />
    //               <div>
    //                 <div>Date of Birth : {loanData.DOB}</div>
    //               </div>
    //               <br />
    //               <div>
    //                 <div>Email Id : {loanData.Emailid}</div>
    //               </div>
    //               <br />
    //               <div>
    //                 <div>Mobile No : {loanData.Mobileno}</div>
    //               </div>
    //               <br />
    //               <div>
    //                 <div>Aadhaar no : {loanData.Aadhaarno}</div>
    //               </div>
    //               <br />
    //               <div>
    //                 <div>PAN card : {loanData.Pancardno}</div>
    //               </div>
    //               <br />
    //               <div>
    //                 <div>Address : {loanData.Address}</div>
    //               </div>
    //               <br />
    //               <div>
    //                 <div>City/Town : {loanData.City}</div>
    //               </div>
    //               <br />
    //               <div>
    //                 <div>State : {loanData.State}</div>
    //               </div>
    //               <br />
    //               <div>
    //                 <div>Pincode : {loanData.Pincode}</div>
    //               </div>
    //               <br />
    //               <div>
    //                 <div>Income source : {loanData.Incomesource}</div>
    //               </div>
    //               <br />
    //               <div>
    //                 <div>Annual Income Amount : {loanData.Annualincome}</div>
    //               </div>
    //               <br />
    //               {loanData.productType === "Loan" ? (
    //                 <div>
    //                   <div>
    //                     <div>
    //                       How much would you like to borrow :{" "}
    //                       {loanData.Wantloan}
    //                     </div>
    //                   </div>
    //                   <br />
    //                   <div>
    //                     <div>For how long : {loanData.Howlong}</div>
    //                   </div>
    //                 </div>
    //               ) : (
    //                 <></>
    //               )}
    //             </div>
    //           </div>
    //           <div className="col-xl-6 col-md-6">
    //             <div className="mb-5">
    //               <div>Photo : </div>
    //               {customerdata.photo !== undefined ? (
    //                 <img
    //                   className="img2"
    //                   src={`/image/${customerdata.photo}`}
    //                   alt=""
    //                 ></img>
    //               ) : (
    //                 "loading"
    //               )}
    //             </div>

    //             <div className="mb-5">
    //               <div>AadharCard : </div>
    //               {customerdata.adharcardPhoto !== undefined ? (
    //                 <img
    //                   className="img"
    //                   src={`/image/${customerdata.adharcardPhoto}`}
    //                   alt=""
    //                 ></img>
    //               ) : (
    //                 "loading"
    //               )}
    //             </div>
    //           </div>
    //           <div className="centered">
    //             <button
    //               className="btn btn-success btn-lg mx-1"
    //               onClick={() => {
    //                 console.log(productdata.productType);
    //                 if (loanData.productType == "Loan") {
    //                   ApproveLoan();
    //                 } else {
    //                   ApproveCard();
    //                 }
    //               }}
    //             >
    //               Approve
    //             </button>
    //             <button
    //               className="btn btn-danger btn-lg mx-1"
    //               onClick={() => {
    //                 DeclineAccount(loanData.LoanId);
    //               }}
    //             >
    //               Decline
    //             </button>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}
