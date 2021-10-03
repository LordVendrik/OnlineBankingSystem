import React, { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router";
import "./Clerkresponse.css";
import hcbgImage from "./istock.jpg";

import Nav from "../NavBar/Nav";
import Sidebar from "../SideBarCLerk/Sidebar";

export default function Clerkresponseq(props) {
  const id = props.match.params.id;
  const [qdetails, setdetailss] = useState({});
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
  }, []);

  useEffect(() => {
    fetch(`/cquerr/${id}`, {
      method: "get",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          console.log(data.list + "asldkjlaskdjlksad");
          setdetailss(data.list);
        }
      });
  }, []);

  const sendQuery = (id) => {
    fetch(`/AnswerQuerryclerk/${id}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        accepts: "application/json",
      },

      body: JSON.stringify(qdetails),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          console.log(data.message);
          history.push("/queryList");
        }
      });
  };
  return (
    <div
      className="bg_image"
      style={{
        backgroundImage: "url(" + hcbgImage + ")",
        backgroundSize: "window",
      }}
    >
      <Nav></Nav>
      <Sidebar />

      <h1
        style={{
          textAlign: "center",
          color: "white",
          fontWeight: "bolder",
          fontFamily: " Georgia, serif",
        }}
      >
        Customer Query
      </h1>

      <div className="container">
        <div className="row">
          <div className="col">
            <div className="card bg-dark">
              <div
                className="card-header bg-dark text-white "
                style={{ fontSize: "large", backgroundColor: "#80ED99" }}
              >
                &#9993; Answer
              </div>
              <div
                className="card-body"
                style={{ fontSize: "large", backgroundColor: "#F6F5F5" }}
              >
                <div className="form-group">
                  <label htmlFor="QueryNo">Qurry No</label>
                  <p>{qdetails.QueryNO}</p>
                </div>
                <div className="form-group">
                  <label htmlFor="email">Query</label>
                  <p>{qdetails.Querry}</p>
                </div>
                <div className="form-group">
                  <label htmlFor="message">Answer</label>
                  <textarea
                    className="form-control"
                    id="message"
                    rows="6"
                    required
                    onChange={(e) => {
                      setdetailss({
                        ...qdetails,
                        Answer: e.target.value,
                      });
                    }}
                  ></textarea>
                </div>
                <div className="mx-auto">
                  <button
                    type="submit"
                    className="btn btn-primary text-right"
                    onClick={() => {
                      sendQuery(qdetails.QueryNO);
                    }}
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-4">
            <div className="card bg-dark mb-3">
              <div
                className="card-header bg text-white text-uppercase"
                style={{ fontSize: "large" }}
              >
                <i className="fa fa-home"></i> &#xf2bb;Customer details
              </div>
              <div
                className="card-body"
                style={{ fontSize: "20px", backgroundColor: "#BBBFCA" }}
              >
                <label>ACCOUNTNO:</label>
                <p>{qdetails.Accountno}</p>
                <label> USERNAME:</label>
                <p>{qdetails.Username}</p>
                <label>&#64;email </label>
                <p>{qdetails.mail}</p>
                &#128241;<label>contact</label>
                <p>
                  <a hrf="#">+91{qdetails.phone}</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ backgroundColor: "black", color: "white" }}>
        &#8471;vcfb
      </div>
    </div>
  );
}
