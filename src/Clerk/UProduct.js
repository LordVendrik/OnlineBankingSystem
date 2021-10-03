/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import { useHistory } from "react-router";
import hcbgImage from "./hcbg.jpg";
import "./BankForm.css";
import Nav from "../NavBar/Nav";
import Sidebar from "../SideBarCLerk/Sidebar";

export default function UProduct() {
  const [formData, setformData] = useState({});
  const history = useHistory();

  const showData = () => {
    console.log(formData);

    fetch("/updateproduct", {
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
          alert("Data Sent");
        }
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
          backgroundImage: "url(" + hcbgImage + ")",
          backgroundSize: "cover",
        }}
      >
        <div className="row">
          <div className="col-md-4 col-md-offset-4">
            <div className="form">
              <h2 className="text-center">Edit Product</h2>
              <hr />

              <fieldset>
                <div className="form-group col-sm-12 col-md-12">
                  <div className="row">
                    <div className="form-group col-md-8 col-md-offset-2">
                      <label htmlFor="Account-Type">productTypee</label>
                      <select
                        className="form-control"
                        id="d2"
                        onChange={(e) => {
                          setformData({
                            ...formData,
                            productType: e.target.value,
                          });
                        }}
                        placeholder="select"
                      >
                        <option>Home Loan</option>
                        <option>Agriculture Loan</option>
                        <option>Student Loan</option>
                      </select>{" "}
                    </div>
                    <div></div>
                  </div>
                  <div className="row">
                    <div className="form-group col-md-8 col-md-offset-2">
                      <label htmlFor="first_name">intrest</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) => {
                          setformData({
                            ...formData,
                            interest: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-md-8 col-md-offset-2">
                      <label htmlFor="last_name">time_in_Months</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) => {
                          setformData({
                            ...formData,
                            time_in_Months: e.target.value,
                          });
                        }}
                      />
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
                        showData();
                      }}
                    >
                      update
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
