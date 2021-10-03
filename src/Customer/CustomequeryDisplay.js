/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */

import React, { useState, useContext } from "react";
import { useEffect } from "react";
import Nav from "../NavBar/Nav";
import hcbgImage from "./hcbg.jpg";
import { userContext } from "../App";
import Sidebar from "../SideBar/Sidebar";

export default function CustomequeryDisplay(props) {
  const { state } = useContext(userContext);
  const [qddetails, setqddetails] = useState({});

  useEffect(() => {
    if (state) {
      fetch(`/cqd/${state.Accountno}`, {
        method: "get",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            console.log(data.error);
          } else {
            setqddetails(data.list);
          }
        });
    }
  }, [state]);

  return (
    <div class="bg_image">
      <Nav />
      <Sidebar />
      <div class="container">
        <div class="row">
          <section class="ftco-section">
            <div class="container">
              <h1>Query History</h1>
              <div class="row justify-content-center">
                <div class="col-md-6 text-center mb-5">
                  <h1
                    class="heading-section text-light"
                    style={{ fontWeight: "800" }}
                  >
                    Responses
                  </h1>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <div class="table-wrap">
                    <table class="table  table-danger  table-hover">
                      <tbody>
                        {qddetails.length > 0
                          ? qddetails.map((sqd) => {
                              console.log(sqd);
                              return (
                                <tr
                                  key={sqd.request_id}
                                  style={{
                                    backgroundColor: "#EDEDED",
                                    fontFamily: "Verdana, sans-serif",
                                    boxShadow: "0px 5px 10px 0px",
                                    textAlign: "start",
                                  }}
                                >
                                  <td>
                                    <p>
                                      <lable>QUERRY:</lable>
                                      {sqd.Querry}
                                    </p>
                                    <p>Answer:{sqd.Answer}</p>
                                  </td>
                                </tr>
                              );
                            })
                          : "No Data to Display CUrrently"}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
