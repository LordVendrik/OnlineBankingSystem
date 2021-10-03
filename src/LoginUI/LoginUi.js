import React from "react";
import logo from "./logo.jpg";
import "./LoginUi.css";
import { useContext } from "react";
import { userContext } from "../App";
import { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import Nav from "../NavBarHome/Nav";

function LoginUi() {
  const { dispatch } = useContext(userContext);
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [CustomerType, setCustomerType] = useState("");
  const history = useHistory();

  const showValues = () => {
    console.log({
      Username: Username,
      Password: Password,
      CustomerType: CustomerType,
    });
    fetch("/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        accepts: "application/json",
      },
      body: JSON.stringify({
        Username: Username,
        Password: Password,
        CustomerType: CustomerType,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          localStorage.setItem("user", JSON.stringify(data.User));
          dispatch({ type: "USER", payload: data.User });
          if (data.User.CustomerType === "Customer") {
            history.push("/customerDashboard");
          } else if (data.User.CustomerType === "Clerk") {
            history.push("/clerkDashboard");
          } else if (data.User.CustomerType === "Manager") {
            history.push("/managerDashboard");
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="login">
      <Nav />
      <section
        className="vh-100"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1565373679107-344d38dbf734?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDh8fGJhbmt8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
      >
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card" style={{ borderRadius: "1rem" }}>
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-none d-md-block">
                    <img
                      src="https://image.shutterstock.com/image-photo/bank-office-sign-600w-89533984.jpg"
                      alt="login form"
                      className="img-fluid"
                      style={{
                        borderRadius: "1rem 0 0 1rem",
                        height: "93%",
                      }}
                    />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                      <div className="d-flex align-items-center mb-3 pb-1">
                        <i
                          className="fas fa-cubes fa-2x me-3"
                          style={{ color: "#ff6219" }}
                        ></i>
                        <span className="h1 fw-bold mb-0">
                          <img
                            src={logo}
                            className="img-fluid"
                            style={{
                              borderRadius: "1rem 0 0 1rem",
                              maxWidth: "40%",
                              height: "auto",
                            }}
                          />
                        </span>
                      </div>
                      <div className="row">
                        <div className="col-md-12 col-sm-12">
                          <p id="error"></p>
                          <div className="borderBot">
                            <select
                              name="CustomerType"
                              className="form-select pad"
                              onChange={(e) => {
                                setCustomerType(e.target.value);
                              }}
                            >
                              <option value="">
                                Choose Whether you are Customer or Staff
                              </option>
                              <option value="Customer">Customer</option>
                              <option value="Manager">Manager</option>
                              <option value="Clerk">Clerk</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="col-md-12 col-sm-12">
                          <div>
                            <div>
                              <label className="pad">Username</label>
                            </div>
                            <div>
                              <input
                                className="form-control pad"
                                type="text"
                                autoFocus
                                placeholder="Enter username"
                                // value={Username}
                                onChange={(e) => {
                                  setUsername(e.target.value);
                                }}
                              />
                            </div>
                            <div>
                              <label className="pad">Password</label>
                            </div>
                            <div>
                              <input
                                className="form-control pad"
                                type="password"
                                placeholder="Enter password"
                                // value={Password}
                                onChange={(e) => {
                                  setPassword(e.target.value);
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="pt-1 mb-4">
                        <button
                          className="btn btn-dark btn-lg btn-block"
                          type="button"
                          onClick={() => {
                            showValues();
                          }}
                        >
                          Login
                        </button>
                        <br />
                      </div>

                      <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                        Don't have an account? &nbsp;&nbsp;
                        <Link to="/Application">Apply for New Account</Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default LoginUi;
