/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import "./forms.css";

export default function Bform() {
  const [formData, setformData] = useState({});
  const [pic, setpic] = useState(null);
  const [pic1, setpics2] = useState(null);
  const [pic2, setpics3] = useState(null);
  const [submitted, setsubmitted] = useState("");

  const showData = () => {
    const data = new FormData();
    const details = Object.entries(formData);
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
        } else {
          window.scrollTo(0, 0);
          setsubmitted("Application submitted");
        }
      });
  };

  const onchangepic = (e) => {
    setpic(URL.createObjectURL(e.target.files[0]));
    setformData({ ...formData, photo: e.target.files[0] });
  };

  const onchangepic2 = (e) => {
    setpics2(URL.createObjectURL(e.target.files[0]));
    setformData({ ...formData, adhar: e.target.files[0] });
  };
  const onchangepic3 = (e) => {
    setpics3(URL.createObjectURL(e.target.files[0]));
    setformData({ ...formData, signature: e.target.files[0] });
  };

  return (
    <div className="apply">
      <div className="form">
        <header className="headres">
          <h1 className="headline">
            <u>APPLICATION FOR NEW ACCOUNT</u>
          </h1>
        </header>
        <div className="container-fluid">
          <p className="message">{submitted}</p>
          <div className="row mt-4">
            <div className="col-xl-6 col-md-12">
              <div className="col-xl-6 col-md-12" id="pic">
                <img src={pic} className="block11" placeholder="photo"></img>
                <br></br>
                <label>Upload photo</label>
                <br></br>

                <input
                  type="file"
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
                    <option defaultValue value="">
                      {" "}
                      select
                    </option>
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
                ></input>
              </div>
              <div className="row">
                <div className="col">
                  <label className="labels">Email:</label>
                </div>
              </div>
              <div className="row">
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => {
                    setformData({ ...formData, EmailId: e.target.value });
                  }}
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
                  <option defaultValue value="">
                    select
                  </option>
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
                ></input>
              </div>
            </div>
            <div className="col-1"></div>
          </div>

          <div className="row mt-4">
            <div className="col-xl-6 col-md-12">
              <div className="row">
                <div className="col">
                  <input style={{ float: "left" }} type="checkbox"></input>
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
