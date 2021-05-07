import React from "react";
import "./Dashboard.css";
import { useEffect, useContext, useState,useRef } from "react";
import { UserContext } from "./providers/UserProvider";
import { Redirect } from "react-router-dom";
import { logOut } from "./services/firebase";
import firebase from "firebase/app";
import cookie, { removeCookie } from "react-cookies";
import "firebase/firestore";
require("firebase/auth");

export default function Dashboard() {
  const cityRef = useRef("");
  const [selectedOption, setselectedOption] = useState("");
   

   function onValueChange(event){
     setselectedOption(event.target.value);
  }

  function submitHandler(event) {
    event.preventDefault();
    const uid = cookie.load("firebaseUid");
    const db = firebase.firestore();
 
    db.collection("users").doc(uid).update({
      city: cityRef.current.value,
      age: selectedOption,
      })
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  }

  return (
    <>
      <div>
        <form onSubmit={submitHandler}>
          <div>
          <div className="radio">
          <label>
            <input
              type="radio"
              value="Below45"
              checked={ selectedOption === "Below45"}
              onChange={onValueChange}
            />
            Below 45
          </label>
        </div>
        <div className="radio">
          <label>
            <input
              type="radio"
              value="Above45"
              checked={ selectedOption === "Above45"}
              onChange={onValueChange}
            />
            Above 45
          </label>
        </div>
            <input
              type="text"
              id="city"
              ref={cityRef}
              placeholder="City"
            />
          </div>
          <button> Submit </button>
        </form>
      </div>
      <div className="dashboard">
        <h1 className="dashboard-text">Welcome Home</h1>
        <button className="logout-button" onClick={logOut}>
          <img
            src="https://img.icons8.com/ios-filled/50/000000/google-logo.png"
            alt="google icon"
          />
          <span> logout</span>
        </button>
      </div>
    </>
  );
}
