import React, { useContext } from "react";
import { userContext } from "../App";
import { useState } from "react";
import { useHistory, Link } from "react-router-dom";

export default function LoginInput() {
  const { dispatch } = useContext(userContext);
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [CustomerType, setCustomerType] = useState("");
  const history = useHistory();

  const showValues = () => {
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
          document.getElementById("error").innerText = data.error;
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
    <div>
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
              <option value="">Choose Whether you are Customer or Staff</option>
              <option value="Customer">Customer</option>
              <option value="Manager">Manager</option>
              <option value="Clerk">Clerk</option>
            </select>
          </div>
        </div>

        <div className="col-md-12 col-sm-12">
          <div>
            <div>
              <label className="pad">Username</label>
            </div>
            <div>
              <input
                className="form-control pad"
                type="text"
                placeholder="Enter Username"
                value={Username}
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
                placeholder="Enter your password"
                value={Password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>

            <div className="pad center">
              <button
                className="btn btn-primary"
                type="submit"
                onClick={() => {
                  showValues();
                }}
              >
                Login
              </button>
            </div>
            <div className="pad center">
              <small>
                Not a Customer?{" "}
                <Link to="/Application">Apply for New Account</Link>
              </small>
            </div>
            <div className="pad center">
              <small>Forgot Password</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
