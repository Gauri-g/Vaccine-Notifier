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
    <Navbar />
    <div className="container col-lg-6 col-xs-12 col-md-6 ">
      <div className="name"><h3>Website Name</h3></div>
      <div className="gbutton"><h6> <center>This is a website that will blah blah blah Lorpesum dunb  gfyugxia</center> </h6></div>
      <div className="gbutton"><GButton /></div>
      <div ><How /></div>
      <button className="privacy" >Privacy Policy</button>
    </div>
    <div className="container col-lg-12 col-xs-12 col-md-12 " id="otherresources">
    <div className="web gbutton margintop"><h6><center>A curated list of websites that are actively helping all of us in this fight against the pandemic.</center></h6></div>
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
