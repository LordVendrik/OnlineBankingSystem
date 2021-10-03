/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

function Nav() {
  const history = useHistory();
  const logout = () => {
    fetch("/logout", { method: "get" })
      .then((res) => res.json())
      .then((data) => {
        history.push("/login");
      });
  };

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar "
        style={{ backgroundColor: "#171717" }}
      >
        <div className="container-fluid">
          <a className="navbar-brand text-light  me-5 pe-5 " href="#y">
            VCB
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse justify-content-center "
            id="navbarNavAltMarkup"
          >
            <div className="navbar-nav ">
              <Link
                to="/login"
                className="nav-link  text-light px-5 "
                aria-current="page"
                href="#g"
                style={{ fontFamily: "  Georgia ,serif" }}
              >
                Home
              </Link>
              <Link
                to="/aboutUs"
                className="nav-link text-light px-5"
                href="#j"
                style={{ fontFamily: "  Georgia ,serif" }}
              >
                About us
              </Link>
              <Link
                to="/terms"
                className="nav-link text-light px-5"
                href="#s"
                style={{ fontFamily: "  Georgia ,serif" }}
              >
                Terms and condition
              </Link>
            </div>
          </div>

          <a
            onClick={() => {
              logout();
            }}
            href="#sdf"
            className="btn btn-danger bg-dark"
            role="button"
          >
            LOG OUT
          </a>
        </div>
      </nav>
    </div>
  );
}
export default Nav;
