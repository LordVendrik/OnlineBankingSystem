/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { useHistory } from "react-router";

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
              <a
                className="nav-link  text-light px-5 "
                aria-current="page"
                href="#g"
                style={{ fontFamily: "  Georgia ,serif" }}
              >
                Home
              </a>
              <a
                className="nav-link text-light px-5"
                href="#j"
                style={{ fontFamily: "  Georgia ,serif" }}
              >
                About us
              </a>
              <a
                className="nav-link text-light px-5"
                href="#g"
                style={{ fontFamily: "  Georgia ,serif" }}
              >
                Contact us
              </a>
              <a
                className="nav-link text-light px-5"
                href="#s"
                style={{ fontFamily: "  Georgia ,serif" }}
              >
                Terms and condition
              </a>

              <div
                className="collapse navbar-collapse justify-content-end "
                id="navbarNavDropdown"
              >
                <ul className="navbar-nav ">
                  <li className="nav-item dropdown ">
                    <a
                      className="nav-link dropdown-toggle text-light "
                      href="#f"
                      id="navbarDropdownMenuLink"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg bg-#FAFF00"
                        width="16"
                        height="16"
                        fill="#FAFF00"
                        className="bi bi-bell"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
                      </svg>{" "}
                      <span className="badge badge-primary  bg-warning">5</span>
                    </a>
                    <ul
                      className="dropdown-menu "
                      aria-labelledby="navbarDropdownMenuLink"
                      style={{ zIndex: "2" }}
                    >
                      <li>
                        <p className="dropdown-item  text-primary ">
                          Transcaction done done{" "}
                        </p>
                      </li>
                      <li>
                        <p className="dropdown-item text-danger ">
                          contcat email wrong
                        </p>
                      </li>
                      <li>
                        <p className="dropdown-item  text-info">
                          contcat email wrong
                        </p>
                      </li>
                      <li>
                        <p className="dropdown-item   text-secondary">
                          contcat email wrong
                        </p>
                      </li>
                      <li>
                        <p className="dropdown-item">contcat email wrong</p>
                      </li>
                      <li>
                        <a className="dropdown-item " href="#g">
                          show all
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
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
