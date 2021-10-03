/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import "./forms.css";

export default function Bform() {
  const [formData, setformData] = useState({});
  const [pic, setpic] = useState(null);
  const [pic1, setpics2] = useState(null);
  const [pic2, setpics3] = useState(null);
  const [submitted, setsubmitted] = useState("");

  const validation = (details) => {
    let isError = false;

    for (let i = 2; i < 18; i++) {
      if (document.getElementById(`field${i}`).value === "") {
        document.getElementById(`field${i}`).style.border = "2px solid red";
        document.getElementById(`field${i}`).scrollIntoView();
        isError = true;
      } else {
        document.getElementById(`field${i}`).style.border = "";
      }
    }

    for (let i = 1; i < 4; i++) {
      if (document.getElementById(`photo${i}`).value === "") {
        document.getElementById(`photo${i}`).style.border = "2px solid red";
        document.getElementById(`photo${i}`).scrollIntoView();
        isError = true;
      } else {
        document.getElementById(`photo${i}`).style.border = "";
      }
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

    if (!document.getElementById("declaration").checked) {
      document.getElementById("declaration").parentElement.style.border =
        "2px solid red";
      document.getElementById("declaration").scrollIntoView();
      isError = true;
    } else {
      document.getElementById("declaration").parentElement.style.border = "";
    }

    if (isError) {
      return false;
    } else {
      return true;
    }
  };

  const showData = () => {
    const data = new FormData();
    const details = Object.entries(formData);

    if (!validation()) {
      return;
    }

    console.log("proceed");

    // for (let i = 0; i < details.length; i++) {
    //   if (
    //     details[i][0] !== "photo" &&
    //     details[i][0] !== "adhar" &&
    //     details[i][0] !== "signature"
    //   ) {
    //     data.append(details[i][0], details[i][1]);
    //   }
    // }

    // data.append("photo", formData.photo);
    // data.append("adhar", formData.adhar);
    // data.append("signature", formData.signature);

    // console.log(formData);

    // fetch("/application", {
    //   method: "post",
    //   body: data,
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     if (data.error) {
    //       console.log(data.error);
    //     } else {
    //       window.scrollTo(0, 0);
    //       setsubmitted("Application submitted");
    //     }
    //   });
  };

  const onchangepic = (e) => {
    const size = e.target.files[0].size;
    const extension = e.target.files[0].name.split(".");

    if (size < 200000 && extension[1] === "jpg") {
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
    if (size < 400000 && (extension[1] === "jpg" || extension[1] === "JPG")) {
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

    if (size < 200000 && extension[1] === "jpg") {
      setpics3(URL.createObjectURL(e.target.files[0]));
      setformData({ ...formData, signature: e.target.files[0] });
    } else {
      setpics3("");
      setformData({ ...formData, signature: "" });
      alert("Image Should be less than 200kb and format should be jpg");
      document.getElementById("photo3").value = "";
    }
  };

  return (
    <div className="apply">
      <div className="form">
        <header className="headres">
          <h1 className="headline">
            <u>APPLICATION FOR NEW ACCOUNT</u>
          </h1>
          <p>{submitted}</p>
        </header>
        <div className="container-fluid">
          <div className="row mt-4">
            <div className="col-xl-6 col-md-12">
              <div className="col-xl-6 col-md-12" id="pic">
                <img src={pic} className="block11" placeholder="photo"></img>
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
              <div className="col-xl-6 col-md-12 mt-5" id="pic1">
                <img src={pic1} className="block2"></img>
                <br></br>
                <label className="p1">
                  Upload addhar(Front page of image required only it should be
                  Clear and Zoomed in)
                </label>
                <br></br>

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
            <div className="col-xl-4 col-md-12">
              <div className="col-xl-12 col-md-12" id="c2">
                <div className="row ">
                  <div className="col">
                    <label className="labels" style={{ float: "left" }}>
                      Accounttype:
                    </label>
                  </div>
                </div>
                <div className="row">
                  <select
                    className="form-select"
                    onChange={(e) => {
                      setformData({ ...formData, AccountType: e.target.value });
                    }}
                  >
                    <option value="saving">Saving</option>
                    <option value="Current">Current</option>
                  </select>
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
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => {
                    setformData({ ...formData, firstName: e.target.value });
                  }}
                  id="field2"
                ></input>
              </div>
              <div className="row">
                <div className="col">
                  <label className="labels">LastName:</label>
                </div>
              </div>
              <div className="row">
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => {
                    setformData({ ...formData, lastName: e.target.value });
                  }}
                  id="field3"
                ></input>
              </div>
              <div className="row">
                <div className="col">
                  <label className="labels">UserName:</label>
                </div>
              </div>
              <div className="row">
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => {
                    setformData({ ...formData, Username: e.target.value });
                  }}
                  id="field4"
                ></input>
              </div>
              <div className="row">
                <div className="col">
                  <label className="labels">Password:</label>
                </div>
              </div>
              <div className="row">
                <input
                  type="password"
                  className="form-control"
                  onChange={(e) => {
                    setformData({ ...formData, Password: e.target.value });
                  }}
                  id="field5"
                ></input>
              </div>
              <div className="row">
                <div className="col">
                  <label className="labels">Email:</label>
                </div>
              </div>
              <div className="row">
                <input
                  type="email"
                  className="form-control"
                  onChange={(e) => {
                    setformData({ ...formData, EmailId: e.target.value });
                  }}
                  id="field6"
                ></input>
              </div>
              <div className="row">
                <div className="col">
                  <label className="labels"> Primary Mobile no:</label>
                </div>
              </div>
              <div className="row">
                <input
                  type="number"
                  className="form-control"
                  onChange={(e) => {
                    setformData({ ...formData, Phoneno: e.target.value });
                  }}
                  id="field7"
                ></input>
              </div>
              <div className="row">
                <div className="col">
                  <label className="labels"> Secondary Mobile no:</label>
                </div>
              </div>
              <div className="row">
                <input
                  type="number"
                  className="form-control"
                  onChange={(e) => {
                    setformData({
                      ...formData,
                      AlternativePhone: e.target.value,
                    });
                  }}
                  id="field8"
                ></input>
              </div>
              <div className="row">
                <div className="col">
                  <label className="labels"> Birthdate:</label>
                </div>
              </div>
              <div className="row">
                <input
                  type="date"
                  className="form-control"
                  style={{ width: "400px", height: " 30px" }}
                  onChange={(e) => {
                    setformData({ ...formData, DOB: e.target.value });
                  }}
                  id="field9"
                ></input>
              </div>
              <div className="row">
                <div className="col">
                  <label className="labels"> Addhaar card no:</label>
                </div>
              </div>
              <div className="row">
                <input
                  type="number"
                  className="form-control"
                  max="999999999999"
                  onChange={(e) => {
                    setformData({ ...formData, AadharNo: e.target.value });
                  }}
                  id="field10"
                ></input>
              </div>
              <div className="row">
                <div className="col">
                  <label className="labels"> Pan card no:</label>
                </div>
              </div>
              <div className="row">
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => {
                    setformData({ ...formData, Pancard: e.target.value });
                  }}
                  id="field11"
                ></input>
              </div>
              <div className="row">
                <div className="col">
                  <label className="labels"> initial amount:</label>
                </div>
              </div>
              <div className="row">
                <input
                  type="number"
                  className="form-control"
                  onChange={(e) => {
                    setformData({ ...formData, intialAmount: e.target.value });
                  }}
                  id="field12"
                ></input>
              </div>
              <div className="row">
                <div className="col">
                  <label className="labels">Gender:</label>
                </div>
              </div>
              <div className="row">
                <select
                  className="form-select"
                  onChange={(e) => {
                    setformData({ ...formData, Gender: e.target.value });
                  }}
                >
                  <option value="male">Male</option>
                  <option value="Female">Female</option>
                  <option value="others">Others</option>
                </select>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label className="labels">Address:</label>
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
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => {
                    setformData({ ...formData, Houseno: e.target.value });
                  }}
                  id="field13"
                ></input>
              </div>
              <div className="row">
                <div className="col">
                  <label className="labels">Colony:</label>
                </div>
              </div>
              <div className="row">
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => {
                    setformData({ ...formData, Colony: e.target.value });
                  }}
                  id="field14"
                ></input>
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
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => {
                    setformData({ ...formData, District: e.target.value });
                  }}
                  id="field15"
                ></input>
              </div>
              <div className="row">
                <div className="col">
                  <label className="labels">State:</label>
                </div>
              </div>
              <div className="row">
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => {
                    setformData({ ...formData, State: e.target.value });
                  }}
                  id="field16"
                ></input>
              </div>
              <div className="row">
                <div className="col">
                  <label className="labels">Pincode:</label>
                </div>
              </div>
              <div className="row">
                <input
                  type="number"
                  className="form-control"
                  onChange={(e) => {
                    setformData({ ...formData, Pincode: e.target.value });
                  }}
                  id="field17"
                ></input>
              </div>
            </div>
            <div className="col-1"></div>
          </div>

          <div className="row mt-4">
            <div className="col-xl-6 col-md-12">
              <div className="row">
                <div className="col">
                  <input
                    style={{ float: "left" }}
                    type="checkbox"
                    id="declaration"
                  ></input>
                  <label style={{ float: "left" }}>Declaration:</label>
                </div>
              </div>
              <div className="row">
                {" "}
                <p style={{ fontFamily: "Georgia, serif", textAlign: " left" }}>
                  <small>
                    I have filled this form out to the best of my knowledge and
                    read the advice on correct entry *
                  </small>
                </p>
              </div>
            </div>
            <div className="col-xl-6 col-md-12">
              <img src={pic2} className="block12" placeholder="photo"></img>
              <br></br>
              <label>Upload photo</label>
              <br></br>

              <input
                type="file"
                id="photo3"
                onChange={onchangepic3}
                className="doc1"
                name="uplode"
                accept="image/*"
                required
              ></input>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-4"></div>
            <div className="col-4">
              <input
                type="submit"
                onClick={() => {
                  showData();
                }}
              ></input>
            </div>
            <div className="col-4"></div>
          </div>
        </div>
        <div>
          <small className="vs">&copy; Application form for VCB,2021. </small>
        </div>
      </div>
    </div>
  );
}
