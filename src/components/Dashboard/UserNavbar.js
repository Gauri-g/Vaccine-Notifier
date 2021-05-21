import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Logo from "../../assets/logo.png";
import "./UserNavbar.css";
import { logOut } from "../../services/firebase";
<script
  src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"
  integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa"
  crossorigin="anonymous"
></script>;

const UserNavbar = () => {
  return (
    <nav className="navbar navbar-expand-md navbar-dark ">
      <a className="navbar-brand" href="/#">
        <img src={Logo} alt="vaccine" />
      </a>

      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#collapsibleNavbar"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="collapsibleNavbar">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="/#">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#otherresources">
              Other Resources
            </a>
          </li>
          <li className="nav-item">
            <button className="logout-button nav-link" onClick={logOut}>
              Log Out
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default UserNavbar;
