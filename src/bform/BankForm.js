/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import { useHistory } from "react-router";
import hcbgImage from "./hcbg.jpg";
import "./BankForm.css";
import { useEffect } from "react";

export default function BankForm() {
  const [formData, setformData] = useState({
    AccountType: "Saving",
    Gender: "male",
  });
  const history = useHistory();
  const [response, setResponse] = useState("");
  const [users, setUsers] = useState([]);
  const [success, setsuccess] = useState("");
  const [style, setstyle] = useState("");
  const [pic, setpic] = useState(null);
  const [pic1, setpics2] = useState(null);
  const [pic2, setpics3] = useState(null);

  useEffect(() => {
    fetch("/checkUsername", { method: "get" })
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users);
        console.log(data.users);
      });
  }, []);

  const validation = (details) => {
    let isError = false;

    for (let i = 2; i < 18; i++) {
      if (document.getElementById(`field${i}`).value === "") {
        document.getElementById(`field${i}`).style.border = "2px solid red";
        document.getElementById(`field${i}`).scrollIntoView();
        return false;
      } else {
        document.getElementById(`field${i}`).style.border = "";
      }
    }

    if (isError) {
      return false;
    }

    for (let i = 1; i < 4; i++) {
      if (document.getElementById(`photo${i}`).value === "") {
        document.getElementById(`photo${i}`).style.border = "2px solid red";
        document.getElementById(`photo${i}`).scrollIntoView();
        return false;
      } else {
        document.getElementById(`photo${i}`).style.border = "";
      }
    }

    if (isError) {
      return false;
    }

    if (document.getElementById("field5").value.length < 8) {
      document.getElementById("field5").style.border = "2px solid red";
      document.getElementById("field5").scrollIntoView();
      alert("Password should be greater than 8 digits");
      return false;
    } else {
      document.getElementById("field5").style.border = "";
    }

    if (document.getElementById("field7").value.length !== 10) {
      document.getElementById("field7").style.border = "2px solid red";
      document.getElementById("field7").scrollIntoView();
      alert("Mobile no should be 10 number long and without 0 at start");
      return false;
    } else {
      document.getElementById("field7").style.border = "";
    }

    if (document.getElementById("field8").value.length !== 10) {
      document.getElementById("field8").style.border = "2px solid red";
      document.getElementById("field8").scrollIntoView();
      alert(
        "Alternate Mobile no should be 10 number long and without 0 at start"
      );
      return false;
    } else {
      document.getElementById("field8").style.border = "";
    }

    if (document.getElementById("field10").value.length !== 12) {
      document.getElementById("field10").style.border = "2px solid red";
      document.getElementById("field10").scrollIntoView();
      alert("Aadhar should be 12 number long");
      return false;
    } else {
      document.getElementById("field10").style.border = "";
    }

    if (document.getElementById("field11").value.length !== 10) {
      document.getElementById("field11").style.border = "2px solid red";
      document.getElementById("field11").scrollIntoView();
      alert("PanNo should be 10 characters long");
      return false;
    } else {
      document.getElementById("field11").style.border = "";
    }

    if (document.getElementById("field6").value) {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (!re.test(document.getElementById("field6").value)) {
        document.getElementById("field6").style.border = "2px solid red";
        document.getElementById("field6").scrollIntoView();
        alert("Enter Valid EMail");
        return false;
      } else {
        document.getElementById("field6").style.border = "";
      }
    }

    if (document.getElementById("field17").value.length !== 6) {
      document.getElementById("field17").style.border = "2px solid red";
      document.getElementById("field17").scrollIntoView();
      alert("Pincode should be 6 numbers long");
      return false;
    } else {
      document.getElementById("field17").style.border = "";
    }

    if (document.getElementById("field12").value < 1000) {
      document.getElementById("field12").style.border = "2px solid red";
      document.getElementById("field12").scrollIntoView();
      alert("Minimum Balance must be 1000");
      return false;
    } else {
      document.getElementById("field12").style.border = "";
    }

    for (let user of users) {
      if (document.getElementById("field4").value === user.Username) {
        document.getElementById("field4").style.border = "2px solid red";
        document.getElementById("field4").scrollIntoView();
        alert("Username already exits");
        return false;
      } else {
        document.getElementById("field4").style.border = "";
      }
    }

    if (!document.getElementById("declaration").checked) {
      document.getElementById("declaration").parentElement.style.border =
        "2px solid red";
      document.getElementById("declaration").scrollIntoView();
      return false;
    } else {
      document.getElementById("declaration").parentElement.style.border = "";
    }

    return true;
  };

  const showData = () => {
    const data = new FormData();
    const details = Object.entries(formData);

    if (!validation()) {
      return;
    }

    for (let i = 0; i < details.length; i++) {
      if (
        details[i][0] !== "photo" &&
        details[i][0] !== "adhar" &&
        details[i][0] !== "signature"
      ) {
        data.append(details[i][0], details[i][1]);
      }
    }

    data.append("photo", formData.photo);
    data.append("adhar", formData.adhar);
    data.append("signature", formData.signature);

    console.log(formData);

    fetch("/application", {
      method: "post",
      body: data,
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
          window.scrollTo(0, 0);
          setResponse(data.message);
          setsuccess(
            "https://thumbs.dreamstime.com/b/tick-mark-icon-flat-illustration-check-mark-vector-tick-mark-icon-flat-illustration-check-mark-vector-164317151.jpg"
          );
          setstyle("text-success");
        }
      });
  };

  const onchangepic = (e) => {
    const size = e.target.files[0].size;
    const extension = e.target.files[0].name.split(".");

    if (e.target.files[0] && size < 200000 && extension[1] === "jpg") {
      setpic(URL.createObjectURL(e.target.files[0]));
      setformData({ ...formData, photo: e.target.files[0] });
    } else {
      setpic("");
      setformData({ ...formData, photo: "" });
      alert("Image Should be less than 200kb and format should be jpg");
      document.getElementById("photo1").value = "";
    }
  };

  const onchangepic2 = (e) => {
    const size = e.target.files[0].size;
    const extension = e.target.files[0].name.split(".");
    console.log(size + extension);
    if (
      e.target.files[0] &&
      size < 400000 &&
      (extension[1] === "jpg" || extension[1] === "JPG")
    ) {
      setpics2(URL.createObjectURL(e.target.files[0]));
      setformData({ ...formData, adhar: e.target.files[0] });
    } else {
      setpics2("");
      setformData({ ...formData, adhar: "" });
      alert("Adhar Image Should be less than 400kb and format should be jpg");
      document.getElementById("photo2").value = "";
    }
  };
  const onchangepic3 = (e) => {
    const size = e.target.files[0].size;
    const extension = e.target.files[0].name.split(".");

    if (e.target.files[0] && size < 200000 && extension[1] === "jpg") {
      setpics3(URL.createObjectURL(e.target.files[0]));
      setformData({ ...formData, signature: e.target.files[0] });
    } else {
      setpics3("");
      setformData({ ...formData, signature: "" });
      alert("Image Should be less than 200kb and format should be jpg");
      document.getElementById("photo3").value = "";
    }
  };

  const animation = () => {};

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
                    history.push("/login");
                  }}
                >
                  Redirect TO Login
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="Bankform">
        <div
          className="container"
          className="bg_image"
          style={{
            backgroundImage: "url(" + hcbgImage + ")",
            backgroundSize: "cover",
          }}
        >
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <div className="form">
                <h2 className="text-center">APPLICATION FOR NEW ACCOUNT</h2>
                <hr />

                <legend>Personal Details</legend>

                <fieldset>
                  <div className="form-group col-sm-12 col-md-8">
                    <div className="row">
                      <div className="form-group col-md-10">
                        <label htmlFor="Account-Type">Account-Type</label>
                        <select
                          className="form-control"
                          onChange={(e) => {
                            setformData({
                              ...formData,
                              AccountType: e.target.value,
                            });
                          }}
                          placeholder="select"
                        >
                          <option value="saving">Saving</option>
                          <option value="current">Current</option>
                        </select>{" "}
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group col-md-10">
                        <label htmlFor="first_name">First name</label>
                        <input
                          type="text"
                          className="form-control"
                          onChange={(e) => {
                            setformData({
                              ...formData,
                              firstName: e.target.value,
                            });
                          }}
                          id="first_name"
                          placeholder="First Name"
                          id="field2"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group  col-md-10">
                        <label htmlFor="last_name">Last name</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Last Name"
                          onChange={(e) => {
                            setformData({
                              ...formData,
                              lastName: e.target.value,
                            });
                          }}
                          id="field3"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-group col-sm-12 col-md-3">
                    <img
                      src={pic}
                      className="block11"
                      placeholder="photo"
                    ></img>
                    <br></br>
                    <label>Upload photo</label>
                    <br></br>

                    <input
                      type="file"
                      id="photo1"
                      onChange={onchangepic}
                      className="doc1"
                      name="uplode"
                      accept="image/*"
                      required
                    ></input>
                  </div>

                  <div className="form-group col-md-6">
                    <label htmlFor="UserName">Username</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="UserName"
                      onChange={(e) => {
                        setformData({ ...formData, Username: e.target.value });
                      }}
                      id="field4"
                    ></input>
                  </div>

                  <div className="form-group col-md-6">
                    <label htmlFor="confirm_password"> Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      onChange={(e) => {
                        setformData({ ...formData, Password: e.target.value });
                      }}
                      id="field5"
                    ></input>
                  </div>

                  <div className="form-group col-md-6">
                    <label htmlFor=" Email"> Email</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder=" Email"
                      onChange={(e) => {
                        setformData({ ...formData, EmailId: e.target.value });
                      }}
                      id="field6"
                    ></input>
                  </div>

                  <div className="form-group col-md-6">
                    <label htmlFor="Primary Mobile no">Primary Mobile no</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Primary Mobile no"
                      onChange={(e) => {
                        setformData({ ...formData, Phoneno: e.target.value });
                      }}
                      id="field7"
                    ></input>
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="Secondary Mobile no">
                      Secondary Mobile no
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Secondary Mobile no"
                      onChange={(e) => {
                        setformData({
                          ...formData,
                          AlternativePhone: e.target.value,
                        });
                      }}
                      id="field8"
                    ></input>
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="BirthDate">Birth Date</label>
                    <input
                      type="date"
                      className="form-control"
                      placeholder="BirthDate"
                      onChange={(e) => {
                        setformData({ ...formData, DOB: e.target.value });
                      }}
                      id="field9"
                    ></input>
                  </div>

                  <div className="form-group col-md-6">
                    <label htmlFor="AdharCardNo">Adhar Card No</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="AdharCardNo"
                      onChange={(e) => {
                        setformData({ ...formData, AadharNo: e.target.value });
                      }}
                      id="field10"
                    ></input>
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="Pan Card No">Pan Card No</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Pan Card No"
                      onChange={(e) => {
                        setformData({ ...formData, Pancard: e.target.value });
                      }}
                      id="field11"
                    ></input>
                  </div>

                  <div className="form-group col-md-6">
                    <label htmlFor="Initial Amount">Initial Amount</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Initial Amount/-"
                      onChange={(e) => {
                        setformData({
                          ...formData,
                          intialAmount: e.target.value,
                        });
                      }}
                      id="field12"
                    ></input>
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="Gender">Gender</label>
                    <select
                      className="form-control"
                      placeholder="select"
                      name=""
                      id="country"
                      onChange={(e) => {
                        setformData({ ...formData, Gender: e.target.value });
                      }}
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>{" "}
                  </div>
                </fieldset>

                <fieldset>
                  <legend>Address Details</legend>

                  <div className="form-group col-md-6">
                    <label htmlFor="House NO">House NO</label>
                    <input
                      type="text"
                      className="form-control"
                      name=""
                      id="first_name"
                      placeholder="House NO"
                      onChange={(e) => {
                        setformData({ ...formData, Houseno: e.target.value });
                      }}
                      id="field13"
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="District">District</label>
                    <input
                      type="text"
                      className="form-control"
                      name=""
                      id="first_name"
                      placeholder="District"
                      onChange={(e) => {
                        setformData({ ...formData, District: e.target.value });
                      }}
                      id="field14"
                    />
                  </div>

                  <div className="form-group col-md-6">
                    <label htmlFor="Colony">Colony</label>
                    <input
                      type="text"
                      className="form-control"
                      name=""
                      id="first_name"
                      placeholder="Colony"
                      onChange={(e) => {
                        setformData({ ...formData, Colony: e.target.value });
                      }}
                      id="field15"
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="State">State</label>
                    <input
                      type="text"
                      className="form-control"
                      name=""
                      id="first_name"
                      placeholder="State"
                      onChange={(e) => {
                        setformData({ ...formData, State: e.target.value });
                      }}
                      id="field16"
                    />
                  </div>

                  <div className="form-group col-md-6"></div>
                  <div className="form-group col-md-6">
                    <label htmlFor="Pincode">Pincode</label>
                    <input
                      type="text"
                      className="form-control"
                      name=""
                      id="first_name"
                      placeholder="Pincode"
                      onChange={(e) => {
                        setformData({ ...formData, Pincode: e.target.value });
                      }}
                      id="field17"
                    />
                  </div>
                </fieldset>

                <fieldset>
                  <legend>Uplodes</legend>

                  <div className="form-group col-md-6">
                    <div className="row">
                      <div className="form-group col-md-12"></div>
                      <div className="form-group col-md-12"></div>
                      <label>
                        {" "}
                        Upload addhar(Front page of image required only it
                        should be Clear and Zoomed in)
                      </label>
                      <input
                        type="file"
                        id="photo2"
                        onChange={onchangepic2}
                        className="doc1"
                        accept="image/*"
                        required
                      ></input>
                    </div>
                  </div>

                  <div className="form-group col-md-6">
                    <img
                      src={pic2}
                      className="block12"
                      placeholder="photo"
                    ></img>
                    <br></br>
                    <label> Upload Signature</label>
                    <br></br>
                    <input
                      type="file"
                      id="photo3"
                      onChange={onchangepic3}
                      className="doc1"
                      accept="image/*"
                      required
                    ></input>
                  </div>
                </fieldset>
                <fieldset>
                  <div className="form-group">
                    <div className="col-md-12">
                      <div className="checkbox">
                        <label>
                          <input
                            type="checkbox"
                            value=""
                            id="declaration"
                          ></input>
                          I accept the terms and conditions
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="col-md-12">
                      <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={() => {
                          showData();
                        }}
                      >
                        Register
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
