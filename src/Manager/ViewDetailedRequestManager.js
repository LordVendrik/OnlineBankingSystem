import React, { useState } from "react";
import "./forms.css";
import { useEffect } from "react";
import { useHistory } from "react-router";
import Nav from "../NavBar/Nav";

export default function ViewDetailedRequestManager(props) {
  const id = props.match.params.id;
  const [details, setdetails] = useState({});
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

    fetch(`/applicationsManager/${id}`, {
      method: "get",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          history.push("/login");
        } else {
          setdetails(data.details);
        }
      });
  }, []);

  const DeclineAccount = (id) => {
    fetch(`/ManagerDecline/${id}`, {
      method: "get",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          console.log(data.message);
          history.push("/approveAccountManager");
        }
      });
  };

  const ApproveAccount = (id) => {
    fetch(`/ManagerApprove/${id}`, {
      method: "get",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          console.log(data.message);
          history.push("/approveAccountManager");
        }
      });
  };

  return (
    <div>
      <Nav />
      <div className="apply2">
        <div className="form">
          <header className="headres">
            <h1 className="heading">Details</h1>
          </header>
          <div className="container-fluid">
            <div className="row mt-4">
              <div className="col-xl-6 col-md-12">
                <div className="col-xl-6 col-md-12" id="pic">
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
                  <label>Photo</label>
                  <br></br>
                </div>
                <div className="col-xl-6 col-md-12 mt-5" id="pic1">
                  <div>
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
                  <br></br>
                  <label className="p1">Aadhar</label>
                  <br></br>

                  <div></div>
                </div>
              </div>

              <div className="col-xl-4 col-md-12">
                <div className="col-xl-12 col-md-12" id="c2">
                  <div className="row ">
                    <div className="row">
                      {" "}
                      <div className="col">
                        {" "}
                        <label className="labels">Request ID:</label>
                      </div>
                    </div>
                    <div className="row">
                      <div>{details.request_id}</div>
                    </div>
                    <div className="col">
                      <label className="labels" style={{ float: "left" }}>
                        Accounttype:
                      </label>
                    </div>
                  </div>
                  <div className="row">
                    <div>{details.AccountType}</div>
                  </div>
                </div>
                <div className="row">
                  {" "}
                  <div className="col">
                    {" "}
                    <label className="labels">FirstName:</label>
                  </div>
                </div>
                <div className="row">
                  <div>{details.firstname}</div>
                </div>
                <div className="row">
                  <div className="col">
                    <label className="labels">LastName:</label>
                  </div>
                </div>
                <div className="row">
                  <div>{details.lastname}</div>
                </div>
                <div className="row">
                  <div className="col">
                    <label className="labels">UserName:</label>
                  </div>
                </div>
                <div className="row">
                  <div>{details.Username}</div>
                </div>
                <div className="row">
                  <div className="col">
                    <label className="labels">Password:</label>
                  </div>
                </div>
                <div className="row">
                  <div>{details.password}</div>
                </div>
                <div className="row">
                  <div className="col">
                    <label className="labels">Email:</label>
                  </div>
                </div>
                <div className="row">
                  <div>{details.Emailid}</div>
                </div>
                <div className="row">
                  <div className="col">
                    <label className="labels"> Primary Mobile no:</label>
                  </div>
                </div>
                <div className="row">
                  <div>{details.phoneno}</div>
                </div>
                <div className="row">
                  <div className="col">
                    <label className="labels"> Secondary Mobile no:</label>
                  </div>
                </div>
                <div className="row">
                  <div>{details.Alternaivephoneno}</div>
                </div>
                <div className="row">
                  <div className="col">
                    <label className="labels"> Birthdate:</label>
                  </div>
                </div>
                <div className="row">
                  <div>{details.DOB}</div>
                </div>
                <div className="row">
                  <div className="col">
                    <label className="labels"> Addhaar card no:</label>
                  </div>
                </div>
                <div className="row">
                  <div>{details.aadharno}</div>
                </div>
                <div className="row">
                  <div className="col">
                    <label className="labels"> Pan card no:</label>
                  </div>
                </div>
                <div className="row">
                  <div>{details.pancardno}</div>
                </div>
                <div className="row">
                  <div className="col">
                    <label className="labels"> initial amount:</label>
                  </div>
                </div>
                <div className="row">
                  <div>{details.initialAmount}</div>
                </div>
                <div className="row">
                  <div className="col">
                    <label className="labels">Gender:</label>
                  </div>
                </div>
                <div className="row">
                  <div>{details.Gender}</div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label className="labels add">
                  <h3>Address:</h3>
                </label>
              </div>
            </div>
            <div className="row">
              <div className="col-1"></div>

              <div className="col-xl-4 col-md-12">
                <div className="row">
                  <div className="col">
                    <label className="labels">House NO:</label>
                  </div>
                </div>
                <div className="row">
                  <div>{details.Houseno}</div>
                </div>
                <div className="row">
                  <div className="col">
                    <label className="labels">Colony:</label>
                  </div>
                </div>
                <div className="row">
                  <div>{details.Colony}</div>
                </div>
              </div>
              <div className="col-2"></div>
              <div className="col-xl-4 col-md-12">
                <div className="row">
                  <div className="col">
                    <label className="labels">District:</label>
                  </div>
                </div>
                <div className="row">
                  <div>{details.District}</div>
                </div>
                <div className="row">
                  <div className="col">
                    <label className="labels">State:</label>
                  </div>
                </div>
                <div className="row">
                  <div>{details.State}</div>
                </div>
                <div className="row">
                  <div className="col">
                    <label className="labels">Pincode:</label>
                  </div>
                </div>
                <div className="row">
                  <div>{details.pincode}</div>
                </div>
              </div>
              <div className="col-1"></div>
            </div>

            <div className="row mt-4">
              <div className="col-xl-12 col-md-12 sig">
                <div>
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
                <br></br>
                <label>Signature photo</label>
                <br></br>
                <div></div>
              </div>
            </div>

            <div className="row">
              <div className="col buttons">
                <button
                  className="btn btn-success mx-4"
                  onClick={() => {
                    ApproveAccount(details.request_id);
                  }}
                >
                  Approve
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    DeclineAccount(details.request_id);
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
