import React from "react";
import hcbgImage from "./hcbg.jpg";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import Nav from "../NavBar/Nav";
import Sidebar from "../SideBarManager/Sidebar";

export default function SendNotification() {
  const [data, setData] = useState({});
  const [response, setResponse] = useState("");
  const history = useHistory();
  const [success, setsuccess] = useState("");
  const [style, setstyle] = useState("");

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

  const sendData = () => {
    console.log(data);
    fetch("/Notification", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        accepts: "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
          setResponse(data.error);
          setsuccess(
            "https://thumbs.dreamstime.com/b/flat-raster-wrong-icon-symbol-isolated-white-background-168810889.jpg"
          );
          setstyle("text-danger");
        } else {
          setResponse(data.message);
          setsuccess(
            "https://thumbs.dreamstime.com/b/tick-mark-icon-flat-illustration-check-mark-vector-tick-mark-icon-flat-illustration-check-mark-vector-164317151.jpg"
          );
          setstyle("text-success");
        }
      });
  };

  return (
    <div>
      {response === "" ? (
        <div></div>
      ) : (
        <div className="filter">
          <div className="modal2 redirectbutton">
            <div className="modal-content">
              <div>
                <img src={success} width="100px"></img>
              </div>
              <div className="modal-body">
                <p className={style}>{response ? response : ""}</p>
              </div>
              <div className="redirectbutton">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    history.push("/managerDashboard");
                  }}
                >
                  Redirect TO Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="Bankform">
        <Nav />
        <Sidebar />
        <div
          className="container"
          className="bg_image"
          style={{
            marginTop: "100px",
          }}
        >
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <div className="form">
                <h2 className="text-center">Send Notification</h2>
                <hr />

                <fieldset>
                  <div className="form-group col-sm-12 col-md-8">
                    <div className="row">
                      <div className="form-group col-md-10">
                        <label htmlFor="Account-Type">Account Number</label>
                        <input
                          type="number"
                          className="form-control"
                          onChange={(e) => {
                            setData({ ...data, accountno: e.target.value });
                          }}
                        ></input>
                      </div>
                    </div>
                  </div>
                  <div className="form-group col-sm-12 col-md-8">
                    <div className="row">
                      <div className="form-group col-md-10">
                        <label htmlFor="Account-Type">Notification</label>
                        <textarea
                          className="form-control"
                          onChange={(e) => {
                            setData({ ...data, Notification: e.target.value });
                          }}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </fieldset>
                <fieldset>
                  <div className="form-group">
                    <div className="col-md-12">
                      <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={() => {
                          sendData();
                        }}
                      >
                        Send Notification
                      </button>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
