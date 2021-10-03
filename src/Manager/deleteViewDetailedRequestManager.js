/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router";
import Nav from "../NavBar/Nav";
import Sidebar from "../SideBarManager/Sidebar";
import hcbgImage from "./hcbg.jpg";
import "./BankForm.css";

export default function DeleteViewDetailedRequestManager(props) {
  const id = props.match.params.id;
  const [details, deletedetails] = useState({});
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

    fetch(`/deleteaccountsManager/${id}`, {
      method: "get",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          history.push("/login");
        } else {
          deletedetails(data.details);
        }
      });
  }, []);

  const DeleteAcc = (id) => {
    fetch(`/ManagerDelete/${id}`, {
      method: "get",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          console.log(data.message);
          history.push("/managerDelete");
        }
      });
  };

  return (
    <div
      class="container"
      class="bg_image"
      style={{
        backgroundImage: "url(" + hcbgImage + ")",
        backgroundSize: "cover",
      }}
    >
      <Nav />
      <Sidebar />
      <div>
        <div class="row">
          <div class="col-md-8 col-md-offset-2">
            <div className="form">
              <h2 class="text-center"> ACCOUNT DETAILS</h2>
              <hr />

              <legend>Personal Details</legend>

              <fieldset>
                <div class="form-group col-sm-12 col-md-8">
                  <div class="row">
                    <div class="form-group col-md-10">
                      <label htmlFor="Account-Type">Account-Type</label>
                      <div>{details.Accountno}</div>
                      <label htmlFor="Account-Type">Account-Type</label>
                      <div>{details.AccountType}</div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="form-group col-md-10">
                      <label htmlFor="first_name">First name</label>
                      <div>{details.firstname}</div>
                    </div>
                  </div>
                  <div className="row">
                    <div class="form-group  col-md-10">
                      <label htmlFor="last_name">Last name</label>
                      <div>{details.lastname}</div>
                    </div>
                  </div>
                </div>
                <div class="form-group col-sm-12 col-md-3">
                  <div>
                    {details.photo !== undefined ? (
                      <img
                        src={`/image/${details.photo}`}
                        alt=""
                        width="150px"
                      ></img>
                    ) : (
                      "loading"
                    )}
                  </div>
                  <br></br>
                  <label>photo</label>
                  <br></br>
                </div>

                <div class="form-group col-md-6">
                  <label htmlFor=" Email"> Email</label>
                  <div>{details.Emailid}</div>
                </div>

                <div class="form-group col-md-6">
                  <label htmlFor="Primary Mobile no">Primary Mobile no</label>
                  <div>{details.phoneno}</div>
                </div>
                <div class="form-group col-md-6">
                  <label htmlFor="Secondary Mobile no">
                    Secondary Mobile no
                  </label>
                  <div>{details.Alternaivephoneno}</div>
                </div>
                <div class="form-group col-md-6">
                  <label htmlFor="BirthDate">BirthDate</label>
                  <div>{details.DOB}</div>
                </div>

                <div class="form-group col-md-6">
                  <label htmlFor="AdharCardNo">AdharCardNo</label>
                  <div>{details.aadharno}</div>
                </div>
                <div class="form-group col-md-6">
                  <label htmlFor="Pan Card No">Pan Card No</label>
                  <div>{details.pancardno}</div>
                </div>

                <div class="form-group col-md-6">
                  <label htmlFor="Initial Amount"> Amount</label>
                  <div>{details.Amount}</div>
                </div>
                <div class="form-group col-md-6">
                  <label htmlFor="Gender">Gender</label>
                  <div>{details.Gender}</div>
                </div>
              </fieldset>

              <fieldset>
                <legend>Address Details</legend>

                <div class="form-group col-md-6">
                  <label htmlFor="House NO">House NO</label>
                  <div>{details.Houseno}</div>
                </div>
                <div class="form-group col-md-6">
                  <label htmlFor="District">District</label>
                  <div>{details.District}</div> <div>{details.Colony}</div>
                </div>

                <div class="form-group col-md-6">
                  <label htmlFor="Colony">Colony</label>
                  <div>{details.Colony}</div>
                </div>
                <div class="form-group col-md-6">
                  <label htmlFor="State">State</label>
                  <div>{details.State}</div>
                </div>

                <div class="form-group col-md-6"></div>
                <div class="form-group col-md-6">
                  <label htmlFor="Pincode">Pincode</label>
                  <div>{details.pincode}</div>
                </div>
              </fieldset>

              <fieldset>
                <legend>Uplodes</legend>

                <div class="form-group col-md-6">
                  <div className="row">
                    <label>Addhar</label>
                    {details.adharcardPhoto !== undefined ? (
                      <img
                        className="img"
                        src={`/image/${details.adharcardPhoto}`}
                        alt=""
                      ></img>
                    ) : (
                      "loading"
                    )}
                  </div>
                </div>

                <div class="form-group col-md-6">
                  <div>
                    <label> Signature</label>
                    <br />
                    {details.signaturephoto !== undefined ? (
                      <img
                        src={`/image/${details.signaturephoto}`}
                        alt=""
                        width="150px"
                      ></img>
                    ) : (
                      "loading"
                    )}
                  </div>
                </div>
              </fieldset>
              <fieldset>
                <div class="form-group">
                  <div class="col-md-12">
                    <div class="checkbox"></div>
                  </div>
                </div>

                <div class="form-group">
                  <div class="col-md-2 col-md-offset-5">
                    <button
                      type="submit"
                      class="btn btn-danger"
                      onClick={() => {
                        DeleteAcc(details.Accountno);
                        <script></script>;
                      }}
                    >
                      Delete
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
