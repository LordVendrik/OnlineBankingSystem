// Customer Apply for loan
import { useHistory } from "react-router";
import React, { useState } from "react";
import { useEffect } from "react";
import "./Loan.css";
import Nav from "../NavBar/Nav";
import Sidebar from "../SideBar/Sidebar";

export default function Loan() {
  const [loanData, setformData] = useState({
    LoanType: "1",
    AccountType: "Current account",
    productType: "Loan",
  });
  const [result, setResult] = useState("");
  const [products, setProducts] = useState([]);
  const history = useHistory();

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
    fetch("/requestProducts", {
      method: "Get",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.err) {
          console.log(data.err);
        } else {
          setProducts(data.list);
        }
      });
  }, []);

  const setLoansetails = () => {
    console.log(loanData);

    fetch("/cheks", {
      method: "Post",
      headers: {
        "content-Type": "application/json",
        accepts: "application/json",
      },

      body: JSON.stringify(loanData),
    })
      .then((res) => res.json())
      .then((data) => {
        setResult("Request Submitted");
        window.scrollTo(0, 0);
      });
  };

  return (
    <div className="Loan">
      <Nav />
      <Sidebar />
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
              <u> Application for Loan</u>
              <h2 className="text-primary">{result}</h2>
            </strong>
          </h1>{" "}
        </div>

        <div className="box3">
          <label htmlFor="Loan type">Product Name : </label> &nbsp;
          <select
            name="Loan"
            id="Loantype"
            onChange={(e) => {
              setformData({ ...loanData, LoanType: e.target.value });
            }}
          >
            {products.length > 0
              ? products.map((product) => {
                  return (
                    <option key={product.productid} value={product.productid}>
                      {product.productType}
                    </option>
                  );
                })
              : console.log("loading")}
          </select>
          &nbsp; &nbsp;&nbsp;
          <label htmlFor="Account type">Account Type : </label> &nbsp;
          <select
            name="Accounttype"
            id="Accounttype"
            onChange={(e) => {
              setformData({ ...loanData, AccountType: e.target.value });
            }}
          >
            <option value="Current account">Current Account</option>
            <option value="Savings account">Savings Account</option>
          </select>
          &nbsp; &nbsp;&nbsp;
          <label htmlFor="productType">Product Type : </label> &nbsp;
          <select
            name="productType"
            id="productType"
            onChange={(e) => {
              setformData({ ...loanData, productType: e.target.value });
            }}
          >
            <option value="Loan">Loan</option>
            <option value="Card">Card</option>
          </select>
          <br />
        </div>

        <div className="box">
          <h6>Tell us about Yourself</h6>
          <p>
            {" "}
            To get your quick loan quote without affecting your credit score,
            please fill the form below !{" "}
          </p>
          <h4> Personal Details: </h4>
          <label htmlFor="accountno">Account NO :</label>
          <input
            type="text"
            id="accountno"
            name="accountno"
            onChange={(e) => {
              setformData({ ...loanData, accountno: e.target.value });
            }}
            required
            placeholder="Account no"
          />
          <label htmlFor="fname">First Name :</label>
          <input
            type="text"
            id="fname"
            name="fname"
            onChange={(e) => {
              setformData({ ...loanData, firstName: e.target.value });
            }}
            required
            placeholder="Enter your First Name"
          />
          <label htmlFor="mname">Middle Name :</label>
          <input
            type="text"
            id="mname"
            name="mname"
            onChange={(e) => {
              setformData({ ...loanData, Middlename: e.target.value });
            }}
            placeholder="Enter your Middle Name"
          />
          <label htmlFor="lname">Last Name :</label>
          <input
            type="text"
            id="lname"
            name="lname"
            onChange={(e) => {
              setformData({ ...loanData, Lastname: e.target.value });
            }}
            required
            placeholder="Enter your Last Name"
          />
          <label htmlFor="Date of Birth">Date of Birth : </label> &nbsp;
          <input
            type="date"
            id="birthday"
            name="Date of Birth"
            onChange={(e) => {
              setformData({ ...loanData, DOB: e.target.value });
            }}
          />
          <br /> <br />
          <label htmlFor="email">Email Id : </label> &nbsp;
          <input
            type="email"
            id="email"
            name="emailid"
            onChange={(e) => {
              setformData({ ...loanData, Emailid: e.target.value });
            }}
            required
            placeholder="Enter your Email Id "
          />{" "}
          <br /> <br />
          <label htmlFor="Mobile no">Mobile No :</label>
          <input
            type="text"
            id="mobileno"
            name="mobileno"
            pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
            onChange={(e) => {
              setformData({ ...loanData, Mobileno: e.target.value });
            }}
            required
            placeholder="Enter your Mobile No"
          />
          <label htmlFor="Aadhaar no">Aadhaar no :</label>
          <input
            type="text"
            id="Aadhaar no"
            name="Aadhaar no"
            onChange={(e) => {
              setformData({ ...loanData, Aadhaarno: e.target.value });
            }}
            required
            placeholder="Enter your Aadhaar no"
          />
          <label htmlFor="PAN card">PAN card :</label>
          <input
            type="text"
            id="PAN card"
            name="PAN card"
            onChange={(e) => {
              setformData({ ...loanData, Pancardno: e.target.value });
            }}
            required
            placeholder="Enter your PAN card no"
          />
          <label htmlFor="Address">Address : </label>
          <input
            type="text"
            id="Address"
            name="Address"
            onChange={(e) => {
              setformData({ ...loanData, Address: e.target.value });
            }}
            placeholder="Enter your Address"
          />
          <label htmlFor="City/Town">City/Town :</label>
          <input
            type="text"
            id="city/Town"
            name="city/Town"
            onChange={(e) => {
              setformData({ ...loanData, City: e.target.value });
            }}
            placeholder="Enter your City"
          />
          <label htmlFor="state">State : </label>
          <input
            type="text"
            id="state"
            name="state"
            onChange={(e) => {
              setformData({ ...loanData, State: e.target.value });
            }}
            placeholder="Enter your State"
          />
          <label htmlFor="pincode">Pincode : </label>
          <input
            type="text"
            id="pincode"
            name="pincode"
            onChange={(e) => {
              setformData({ ...loanData, Pincode: e.target.value });
            }}
            placeholder="Enter your Pincode"
          />
          <label htmlFor="incomesource">Income source : </label>
          <input
            type="text"
            id="incomesource"
            name="incomesource"
            onChange={(e) => {
              setformData({ ...loanData, Incomesource: e.target.value });
            }}
            placeholder="Enter your income source"
          />
          <label htmlFor="incomesource">Annual Income Amount : </label>
          <input
            type="text"
            id="annualincome"
            name="annualincome"
            onChange={(e) => {
              setformData({ ...loanData, Annualincome: e.target.value });
            }}
            placeholder="Enter your Annual income amount"
          />
          {loanData.productType === "Loan" ? (
            <div>
              <label htmlFor="loan you want">
                How much would you like to borrow ?
              </label>
              <input
                type="text"
                id="How much would you like to borrow ?"
                name="How much would you like to borrow ?"
                onChange={(e) => {
                  setformData({ ...loanData, Wantloan: e.target.value });
                }}
                placeholder="Enter amount you want"
              />
              <label htmlFor="How long">For how long ?</label>
              <input
                type="text"
                id="For how long ?"
                name="For how long ?"
                onChange={(e) => {
                  setformData({ ...loanData, Howlong: e.target.value });
                }}
                placeholder="Enter for how long ?"
              />
            </div>
          ) : (
            console.log("card")
          )}
        </div>
        <div></div>

        <div className="box">
          <input
            type="checkbox"
            id="instructions"
            name="instructions"
            value="instructions"
          />
          <label htmlFor="instructions">
            {" "}
            I have Read customer declaration of Credit card and understood all
            its terms and conditions and confirm that details given above belong
            to me and authorise Policy and its affiliates or assosiates contact
            me on the detils provided.
          </label>
          <br></br>
        </div>

        <div align="center">
          <button
            type="submit"
            form="form"
            onClick={() => {
              setLoansetails();
            }}
            value="Submit"
          >
            Submit
          </button>
        </div>

        {/* <div>{data.r} </div> */}
      </div>
    </div>
  );
}
