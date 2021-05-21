import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./Login.css";
import GButton from "./components/Login/GButton";
import Navbar from "./components/Login/Navbar";
import How from "./components/Login/How";
import Card from "./components/Login/Card";

export default function Login() {
  return (
    <>
      <div className="bg1">
        <Navbar />
        <div className="container webname">
          <h1>Covid-19 Vaccination</h1>
        </div>
        <div className="container gbutton">
          <h6>
            <center>
              Perfect place to find available vaccine slots closest to you!
            </center>{" "}
          </h6>
        </div>
      </div>
      <div className="container col-lg-6 col-xs-12 col-md-6 ">
        <div className="gbutton">
          <GButton />
        </div>
        <div>
          <How />
        </div>
        {/* <button className="privacy">Privacy Policy</button> */}
      </div>
      <div
        className="container col-lg-12 col-xs-12 col-md-12 "
        id="otherresources"
      >
        <div className="web">
          <h6>
            <center>
              A curated list of websites that are actively helping all of us in
              this fight against the pandemic.
            </center>
          </h6>
        </div>
        <div className="row ">
          <Card />
          <Card />
        </div>
        <div className="row">
          <Card />
          <Card />
        </div>
        <div className="row">
          <Card />
          <Card />
        </div>
      </div>
    </>
  );
}
