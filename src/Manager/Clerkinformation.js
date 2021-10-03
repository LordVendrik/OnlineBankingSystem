import React, { useState } from "react";
import Nav from "../NavBar/Nav";
import Sidebar from "../SideBarManager/Sidebar";
//import { useHistory } from "react-router";
// import loanImage from "./loan.jpg";
import "./Clerkinformation.css";

export default function Clerkinformation() {
  const [clerkdata, setformData] = useState({});
  //const history = useHistory();

  // const [submitted, setsubmitted] = useState("")

  // const showData = () => {
  //   fetch("/application", {
  //       method: "post",
  //       body: data,
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         if (data.error) {
  //           console.log(data.error);
  //         } else {
  //           window.scrollTo(0, 0);
  //           setsubmitted("Application submitted");
  //         //  history.push("/login");

  //         }
  //       });
  //   };

  const setClerksetails = () => {
    for (let i = 1; i < 3; i++) {
      if (document.getElementById(`field${i}`).value == "") {
        document.getElementById(`field${i}`).style.border = "2px solid red";
        document.getElementById(`field${i}`).scrollIntoView();
        return;
      } else {
        document.getElementById(`field${i}`).style.border = "";
      }
    }

    fetch("/addClerk", {
      method: "Post",
      headers: {
        "content-Type": "application/json",
        accepts: "application/json",
      },

      body: JSON.stringify(clerkdata),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.r);
        alert("successfully added");
      });
  };

  return (
    <div>
      <Nav />
      <Sidebar />
      <div
        className="container"
        className="bg_image"
        style={{
          //   backgroundImage: 'url('+loanImage+')',
          backgroundSize: "cover",
        }}
      >
        <div className="row">
          <div className="col-md-8 col-md-offset-2">
            <div className="form">
              <div className="setimg">
                <h1 className="text-center">Fill Details</h1>
                <hr />
              </div>
              {/* <p className="message">{submitted}</p> */}
              <fieldset>
                <div className="form-group col-md-12">
                  <label htmlFor="Firstname">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Username"
                    onChange={(e) => {
                      setformData({ ...clerkdata, Username: e.target.value });
                    }}
                    id="field1"
                  ></input>
                </div>

                <div className="form-group col-md-12">
                  <label htmlFor="Password"> Password</label>
                  <input
                    type="Password"
                    className="form-control"
                    placeholder="Password"
                    onChange={(e) => {
                      setformData({ ...clerkdata, Password: e.target.value });
                    }}
                    id="field2"
                  ></input>
                </div>
              </fieldset>
              <fieldset>
                <div align="center">
                  <div className="form-group">
                    <div className="col-md-12">
                      <button
                        type="submit"
                        className="btn btn-success "
                        onClick={() => {
                          setClerksetails();
                        }}
                      >
                        Submit
                      </button>
                    </div>
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
