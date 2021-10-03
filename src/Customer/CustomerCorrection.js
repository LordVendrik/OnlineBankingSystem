import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router";
import correctionImage from "./hcbg.jpg";
import "./CustomerCorrection.css";
import { userContext } from "../App";
import Nav from "../NavBar/Nav";
import Sidebar from "../SideBar/Sidebar";

export default function CustomerCorrection() {
  const [formData, setformData] = useState({});
  const { state } = useContext(userContext);

  useEffect(() => {
    if (state) {
      setformData({ ...formData, Accountno: state.Accountno });
    }
  }, [state]);

  const showData = () => {
    for (let i = 1; i < 10; i++) {
      if (document.getElementById(`field${i}`).value === "") {
        document.getElementById(`field${i}`).style.border = "2px solid red";
        document.getElementById(`field${i}`).scrollIntoView();
        return;
      } else {
        document.getElementById(`field${i}`).style.border = "";
      }
    }

    if (document.getElementById("field3").value) {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (!re.test(document.getElementById("field3").value)) {
        document.getElementById("field3").style.border = "2px solid red";
        document.getElementById("field3").scrollIntoView();
        alert("Enter Valid EMail");
        return;
      } else {
        document.getElementById("field3").style.border = "";
      }
    }

    if (document.getElementById("field4").value.length !== 10) {
      document.getElementById("field4").style.border = "2px solid red";
      document.getElementById("field4").scrollIntoView();
      alert("Mobile no should be 10 number long and without 0 at start");
      return;
    } else {
      document.getElementById("field4").style.border = "";
    }

    console.log(formData);

    fetch("/Update", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        accepts: "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          // window.scrollTo(0, 0);
          //  history.push("/login");
          alert(data.message);
        }
      });
  };

  return (
    <div>
      <Nav />
      <Sidebar />
      <div
        class="container"
        class="bg_image"
        style={{
          backgroundImage: "url(" + correctionImage + ")",
          backgroundSize: "cover",
        }}
      >
        <div class="row">
          <div class="col-md-8 col-md-offset-2">
            <div className="form">
              <div class="setimg">
                <h1 class="text-center">Correction Form</h1>
                <hr />
              </div>
              <legend>Personal Details</legend>

              <fieldset>
                <div class="form-group col-md-6">
                  <label htmlFor="Firstname">First name</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="First name"
                    onChange={(e) => {
                      setformData({ ...formData, Firstname: e.target.value });
                    }}
                    id="field1"
                    //value = {data.Firstname}
                  ></input>
                </div>

                <div class="form-group col-md-6">
                  <label htmlFor="LastName">Last name</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Last Name"
                    onChange={(e) => {
                      setformData({ ...formData, LastName: e.target.value });
                    }}
                    id="field2"
                    //value = {data.LastName}
                  ></input>
                </div>

                <div class="form-group col-md-6">
                  <label htmlFor=" Email"> Email</label>
                  <input
                    type="email"
                    class="form-control"
                    placeholder=" Email"
                    onChange={(e) => {
                      setformData({ ...formData, EmailId: e.target.value });
                    }}
                    id="field3"
                    //value = {data.EmailId}
                  ></input>
                </div>

                <div class="form-group col-md-6">
                  <label htmlFor=" Mobile no"> Mobile no</label>
                  <input
                    type="number"
                    class="form-control"
                    placeholder=" Mobile no"
                    onChange={(e) => {
                      setformData({
                        ...formData,
                        Mobileno: e.target.value,
                      });
                    }}
                    id="field4"
                    // value = {data.Mobileno}
                  ></input>
                </div>
                <div class="form-group col-md-6">
                  <label htmlFor="BirthDate">Birth date</label>
                  <input
                    type="date"
                    class="form-control"
                    placeholder="BirthDate"
                    onChange={(e) => {
                      setformData({ ...formData, DOB: e.target.value });
                    }}
                    id="field5"
                    // value = {data.DOB}
                  ></input>
                </div>
              </fieldset>

              <fieldset>
                <legend>Address Details</legend>

                <div class="form-group col-md-6">
                  <label htmlFor="colony">Colony</label>
                  <input
                    type="text"
                    class="form-control"
                    name=""
                    id="colony"
                    placeholder="Colony"
                    onChange={(e) => {
                      setformData({ ...formData, colony: e.target.value });
                    }}
                    id="field6"
                    //  value = {data.colony}
                  />
                </div>
                <div class="form-group col-md-6">
                  <label htmlFor="District">District</label>
                  <input
                    type="text"
                    class="form-control"
                    name=""
                    id="District"
                    placeholder="District"
                    onChange={(e) => {
                      setformData({ ...formData, District: e.target.value });
                    }}
                    id="field7"
                    // value = {data.District}
                  />
                </div>

                <div class="form-group col-md-6">
                  <label htmlFor="Pincode">Pincode</label>
                  <input
                    type="text"
                    class="form-control"
                    name=""
                    id="Pincode"
                    placeholder="Pincode"
                    onChange={(e) => {
                      setformData({ ...formData, Pincode: e.target.value });
                    }}
                    id="field8"
                    //  value = {data.Pincode}
                  />
                </div>
                <div class="form-group col-md-6">
                  <label htmlFor="State">State</label>
                  <input
                    type="text"
                    class="form-control"
                    name=""
                    id="State"
                    placeholder="State"
                    onChange={(e) => {
                      setformData({ ...formData, State: e.target.value });
                    }}
                    id="field9"
                    // value = {data.State}
                  />
                </div>
              </fieldset>

              <fieldset>
                <div align="center">
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
                </div>
              </fieldset>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
