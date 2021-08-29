import React from "react";
import "./ManagerFirstPage.css";
import Nav from "../NavBar/Nav";
import { useHistory } from "react-router";
import { useEffect } from "react";

export default function ManagerDashboard() {
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
  }, []);

  return (
    <div>
      <Nav />
      <div className="manager">
        <div className="Headline">
          <h1>Manager Dashboard</h1>
        </div>
        <div className="first">
          <div className="grid-container">
            <div className="grid-item">
              <button
                type="button"
                className="btn notnav"
                value="Submit"
                onClick={() => {
                  history.push("/approveAccountManager");
                }}
              >
                <div>
                  <div>
                    <h2>Approve for new customers accounts</h2>
                  </div>
                  <div>
                    <img
                      src="data:image/png;base64,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"
                      width="23%"
                      height="25%"
                      alt="123"
                    ></img>
                  </div>
                </div>
              </button>
            </div>
            <div className="grid-item">
              <button type="button" className="btn notnav" value="Submit">
                <div>
                  <div>
                    <h2>Approve for loan and the credit card</h2>
                  </div>
                  <div>
                    <img
                      src="https://thumbs.dreamstime.com/z/special-offer-love-book-delete-user-icons-set-credit-card-sign-vector-simple-discounts-customer-feedback-remove-profile-loan-143090432.jpg"
                      width="27%"
                      height="30%"
                      alt="234"
                    ></img>
                  </div>
                </div>
              </button>
            </div>
            <div className="grid-item">
              <button type="button" className="btn notnav" value="Submit">
                <div>
                  <div>
                    <h2>View and Delete customer account</h2>
                  </div>
                  <div>
                    <img
                      src="https://cdn.iconscout.com/icon/premium/png-512-thumb/edit-customer-account-2154718-1809578.png"
                      width="32%"
                      height="27%"
                      alt="345"
                    ></img>
                  </div>
                </div>
              </button>
            </div>
            <div className="grid-item">
              <button type="button" className="btn notnav" value="Submit">
                <div>
                  <div>
                    <h2> Can create,edit and delete all details of clerk</h2>
                  </div>
                  <div>
                    <img
                      src="https://booster.io/wp-content/uploads/custom-order-numbers-e1438361586475.png"
                      width="23%"
                      height="20%"
                      alt="456"
                    ></img>
                  </div>
                </div>
              </button>
            </div>
            <div className="grid-item">
              <button type="button" className="btn notnav" value="Submit">
                <div>
                  <div>
                    <h2>Can watch all trasactions of customers</h2>
                  </div>
                  <div>
                    <img
                      src="data:image/jpeg;base64,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"
                      width="35%"
                      height="30%"
                      alt="567"
                    ></img>
                  </div>
                </div>
              </button>
            </div>
            <div className="grid-item">
              <button type="button" className="btn notnav" value="Submit">
                <div>
                  <div>
                    <h2>Send a notification to all or particular customer</h2>
                  </div>
                  <div>
                    <img
                      src="https://stormotion.io/blog/content/images/2018/11/twitter-notifications.png"
                      width="26%"
                      height="25%"
                      alt="678"
                    ></img>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
