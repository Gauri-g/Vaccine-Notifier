import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./Login.css";
import GButton from "./components/Login/GButton";
import Navbar from "./components/Login/Navbar";
import How from "./components/Login/How";
import Resources from "./components/Resources/Resources";
import Footer from "./components/Footer/Footer.js";

export default function Login() {
  return (
    <>
      <div className="first-container">
        <Navbar />
        <div className="bg1">
          <h1>Covid-19 Vaccination</h1>
          <p className="bg1-text">
            Perfect place to find available vaccine slots closest to you!
          </p>
        </div>
        <div className="container">
          <GButton />
          <How />
        </div>
      </div>
      <div className="second-container" id="otherresources">
        <div className="web">
          <h6>
            A curated list of websites that are actively helping all of us in
            this fight against the pandemic.
          </h6>
        </div>
        <Resources />
        <Footer />
      </div>
    </>
  );
}
