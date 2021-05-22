import React, { useEffect, useState } from "react";
import cookie from "react-cookies";
import UserNavbar from "./components/Dashboard/UserNavbar.js";
import How from "./components/Dashboard/How";
import Form from "./components/Register/Form";
import * as typeformEmbed from "@typeform/embed";
import ReactLoading from "react-loading";
// import { getUid } from "./services/firebase";

import axios from "axios";

import "./Dashboard.css";
import Resources from "./components/Resources/Resources.jsx";

export default function Dashboard() {
  const [district, setDistrict] = useState("");
  const [age, setAge] = useState(0);
  const [mail, setMail] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    const uid = cookie.load("key");
    if (uid === null) {
      console.log("uid is null");
      //   return (window.location.href = "/");
    }
    const headers = { Authorization: uid };
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/get`, { headers })
      .then((response) => {
        console.log(response, "hereeee");
        if (!response.data.user_exists) {
          return (window.location.href = "/");
        } else if (response.data.data.age !== 0) {
          let data = response.data.data;
          console.log(data);
          setMail(data.email);
          setDistrict(data.district);
          setAge(data.age);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
        window.location.href = "/";
      });
  };

  const popup = typeformEmbed.createPopup(
    "https://form.typeform.com/to/a1928yCA",
    {
      autoClose: 3000,
      hideHeaders: true,
      hideFooter: true,
      onSubmit: () => {
        console.log("submitted typeform");
      },
    }
  );

  if (loading) {
    return (
      <div className="loading">
        <ReactLoading
          type={"spinningBubbles"}
          color={"#ffffff"}
        />
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
            <Form district={district} age={age} />
          </div>
          <div>
            <How />
          </div>
          <div className="bug">
            <button className="privacy white" onClick={() => popup.open()}>
              Report a bug
            </button>
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
      </div>
    </>
  );
}
