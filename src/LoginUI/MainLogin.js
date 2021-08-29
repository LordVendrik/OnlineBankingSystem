import React from "react";
import LoginInput from "./LoginInput";
import "../style.css";

export default function MainLogin() {
  return (
    <div>
      <h1 className="name">
        <b>Venketeshwar Chit Fund Bank</b>
      </h1>
      <div className="maindiv">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-sm-12 cn">
              <div className="tag">
                <p>
                  21 DIN M PAISA <br /> DOUBLE KRNE KA <br /> WADA
                </p>
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <LoginInput />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
