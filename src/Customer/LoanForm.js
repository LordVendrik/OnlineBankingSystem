import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useContext } from "react";
import loanImage from "./loan.jpg";
import "./LoanForm.css";
import { userContext } from "../App";
import Nav from "../NavBar/Nav";
import Sidebar from "../SideBar/Sidebar";

export default function LoanForm() {
  const [formData, setformData] = useState({ LoanType: "Home loan" });
  const history = useHistory();
  const { state } = useContext(userContext);
  const [message, setmessage] = useState("");
  const [success, setsuccess] = useState("");
  const [style, setstyle] = useState("");
  const [pic1, setpics2] = useState(null);
  const [submitted, setsubmitted] = useState("");
  const [timePeriod, settimePeriod] = useState(4);

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

  const Validation = () => {
    for (let i = 1; i < 8; i++) {
      if (document.getElementById(`field${i}`).value === "") {
        document.getElementById(`field${i}`).style.border = "2px solid red";
        document.getElementById(`field${i}`).scrollIntoView();
        return false;
      } else {
        document.getElementById(`field${i}`).style.border = "";
      }
    }

    if (document.getElementById(`field5`).value !== state.Aadharno) {
      document.getElementById(`field5`).style.border = "2px solid red";
      document.getElementById(`field5`).scrollIntoView();
      alert(
        "Aadhar Number not equal to the aadhar provided while making account"
      );
      return false;
    } else {
      document.getElementById(`field5`).style.border = "";
    }

    if (document.getElementById(`field6`).value > 4000) {
      document.getElementById(`field6`).style.border = "2px solid red";
      document.getElementById(`field6`).scrollIntoView();
      alert("Max amount is 4000");
      return false;
    } else {
      document.getElementById(`field6`).style.border = "";
    }

    if (document.getElementById(`field2`).value < 2000) {
      document.getElementById(`field2`).style.border = "2px solid red";
      document.getElementById(`field2`).scrollIntoView();
      alert("Min 2000 annual income is needed");
      return false;
    } else {
      document.getElementById(`field2`).style.border = "";
    }

    if (document.getElementById("declaration").checked == false) {
      document.getElementById("declaration").parentElement.style.border =
        "2px solid red";
      document.getElementById("declaration").scrollIntoView();
      return false;
    } else {
      document.getElementById("declaration").parentElement.style.border = "";
    }

    return true;
  };

  const showData = () => {
    const data = new FormData();
    const details = Object.entries(formData);
    for (let i = 0; i < details.length; i++) {
      if (details[i][0] !== "BankStatement") {
        data.append(details[i][0], details[i][1]);
      }
    }

    data.append("accountno", state.Accountno);
    data.append("Username", state.Username);
    data.append("datetime", new Date().getTime());
    data.append("timeRemaining", timePeriod);
    data.append("incomeproofphoto", formData.BankStatement);

    if (!Validation()) {
      return;
    }

    fetch("/cheks", {
      method: "post",
      body: data,
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
          setmessage(data.message);
          setsuccess(
            "https://thumbs.dreamstime.com/b/tick-mark-icon-flat-illustration-check-mark-vector-tick-mark-icon-flat-illustration-check-mark-vector-164317151.jpg"
          );
          setstyle("text-success");
        }
      });
  };

  const onchangepic2 = (e) => {
    const size = e.target.files[0].size;
    const extension = e.target.files[0].name.split(".");

    if (e.target.files[0] && size < 300000 && extension[1] === "jpg") {
      setformData({ ...formData, BankStatement: e.target.files[0] });
    } else {
      setformData({ ...formData, BankStatement: "" });
      alert("Image Should be less than 300kb and format should be jpg");
      document.getElementById("field7").value = "";
    }
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
      <div
        class="container"
        class="bg_image"
        style={{
          backgroundImage: "url(" + loanImage + ")",
          backgroundSize: "cover",
        }}
      >
        <div class="row">
          <div class="col-md-8 col-md-offset-2">
            <div className="form">
              <div class="setimg">
                <h1 class="text-center">Application for Loan</h1>
                <hr />{" "}
              </div>

              <legend>Personal Details</legend>

              <fieldset>
                <div class="form-group col-md-6">
                  <label htmlFor="Account-Type">Product Name</label>
                  <select
                    class="form-control"
                    onChange={(e) => {
                      setformData({ ...formData, LoanType: e.target.value });
                      if (
                        document.getElementById("field1").value ===
                        "Agriculture Loan"
                      ) {
                        settimePeriod(3);
                      } else if (
                        document.getElementById("field1").value ===
                        "Student Loan"
                      ) {
                        settimePeriod(5);
                      } else {
                        settimePeriod(4);
                      }
                    }}
                    id="field1"
                    placeholder="select"
                  >
                    <option value="Home Loan">Home Loan</option>
                    <option value="Agriculture Loan">Agriculture Loan</option>
                    <option value="Student Loan">Student Loan</option>
                  </select>
                </div>

                <div class="form-group col-md-6">
                  <label htmlFor="income"> Annual income</label>
                  <input
                    type="number"
                    class="form-control"
                    placeholder="Annual Income"
                    onChange={(e) => {
                      setformData({
                        ...formData,
                        Annualincome: e.target.value,
                      });
                    }}
                    id="field2"
                  ></input>
                </div>

                <div class="form-group col-md-6">
                  <label htmlFor=" Email"> Email</label>
                  <input
                    type="email"
                    class="form-control"
                    placeholder=" Email"
                    onChange={(e) => {
                      setformData({ ...formData, Emailid: e.target.value });
                    }}
                    id="field3"
                  ></input>
                </div>

                <div class="form-group col-md-6">
                  <label htmlFor=" Income_source"> Income source</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder=" Income source"
                    onChange={(e) => {
                      setformData({
                        ...formData,
                        Incomesource: e.target.value,
                      });
                    }}
                    id="field4"
                  ></input>
                </div>

                <div class="form-group col-md-6">
                  <label htmlFor="AdharCardNo">Aadhaar card no</label>
                  <input
                    type="number"
                    class="form-control"
                    placeholder="Adhar Card No"
                    onChange={(e) => {
                      setformData({ ...formData, Aadhaarno: e.target.value });
                    }}
                    id="field5"
                  ></input>
                </div>

                <div class="form-group col-md-6">
                  <label htmlFor="loanamount"> Loan amount</label>
                  <input
                    type="number"
                    class="form-control"
                    placeholder="Loan amount"
                    onChange={(e) => {
                      setformData({ ...formData, Wantloan: e.target.value });
                    }}
                    id="field6"
                  ></input>
                </div>

                <div class="form-group col-md-6">
                  <label htmlFor="timePeriod"> Time Period</label>
                  <input
                    type="number"
                    class="form-control"
                    placeholder="timePeriod"
                    value={timePeriod}
                    disabled
                    id="field6"
                  ></input>
                </div>
              </fieldset>

              <fieldset>
                <legend>Upload Document</legend>

                <div class="form-group col-md-6">
                  <div class="form-group col-md-12"></div>
                  <label> Proof of the Income </label>
                  <input
                    type="file"
                    onChange={onchangepic2}
                    className="doc1"
                    accept="image/*"
                    required
                    id="field7"
                  ></input>
                </div>
              </fieldset>
              <fieldset>
                <div class="form-group">
                  <div class="col-md-12">
                    <div class="checkbox">
                      <label>
                        <input
                          type="checkbox"
                          value=""
                          id="declaration"
                        ></input>
                        I have Read <b> customer declaration</b> of Loan and
                        understood all its <b> terms and conditions</b> and
                        confirm that details given above belong to me and
                        authorise Policy and its affiliates or assosiates
                        contact me on the detils provided.
                      </label>
                    </div>
                  </div>
                </div>

                <div class="form-group">
                  <div class="col-md-12">
                    <button
                      type="submit"
                      class="btn btn-success "
                      onClick={() => {
                        showData();
                      }}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
