import React, { useEffect, useState } from "react";
import cookie from "react-cookies";
import UserNavbar from "./components/Dashboard/UserNavbar.js";
import How from "./components/Dashboard/How";
import Form from "./components/Register/Form";
import Resources from "./components/Resources/Resources.jsx";
import Footer from "./components/Footer/Footer.js";
import ReactLoading from "react-loading";
// import { createPopup } from "@typeform/embed";
// import "@typeform/embed/build/css/widget.css";
// import { getUid } from "./services/firebase";

import axios from "axios";

import "./Dashboard.css";

export default function Dashboard() {
  const [district, setDistrict] = useState("");
  const [age, setAge] = useState(0);
  const [mail, setMail] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    const uid = cookie.load("key");
    if (uid === null) {
      //   return (window.location.href = "/");
    }
    const headers = { Authorization: uid };
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/get`, { headers })
      .then((response) => {
        if (!response.data.user_exists) {
          return (window.location.href = "/");
        } else if (response.data.data.age !== 0) {
          let data = response.data.data;
          setMail(data.email);
          setDistrict(data.district);
          setAge(data.age);
        } else {
          setEdit(true);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
        window.location.href = "/";
      });
  };

  const submitHandler = () => {
    const uid = cookie.load("key");
    if (district === "") {
      return window.alert("Kindly enter district.");
    }
    const body = {
      district,
      age: Number(age),
    };
    const headers = { Authorization: uid };
    axios
      .put(`${process.env.REACT_APP_BACKEND_URL}/update`, body, { headers })
      .then((response) => {
        setIsOpen(true);
      })
      .catch((error) => {
        console.log(error.message);
        // setShow(true);
      });
  };

  if (loading) {
    return (
      <div className="loading">
        <ReactLoading type={"spinningBubbles"} color={"#ffffff"} />
      </div>
    );
  }
  return (
    <>
      <UserNavbar />
      <div className="bg2">
        <div className="container col-lg-6 col-xs-12 col-md-6 ">
          <p className="name">CoWIN Notifier</p>
          <h5 className="maild">{mail}</h5>
          <div className="form">
            <Form
              district={district}
              age={age}
              setDistrict={setDistrict}
              setAge={setAge}
              modalIsOpen={modalIsOpenn}
              setIsOpen={setIsOpen}
              submitHandler={submitHandler}
              edit={edit}
              setEdit={setEdit}
            />
          </div>
          <div>
            <How />
          </div>
          <div className="bug">
            <a href="https://9txi4ju6lrd.typeform.com/to/a1928yCA" className="privacy white" id="bt-popup">
              Report a bug
            </a>
          </div>
        </div>
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
        <Resources />
        <Footer />
      </div>
    </>
  );
}
