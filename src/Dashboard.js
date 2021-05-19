import React from "react";
import "./Dashboard.css";
import { useEffect,useState} from "react"; 
import cookie from "react-cookies";
import "firebase/firestore"; 
import UserNavbar from "./components/Dashboard/UserNavbar.js";
import How from "./components/Dashboard/How";
import Card from "./components/Login/Card";
import Form from "./components/Register/Form";
require("firebase/auth");

export default function Dashboard() {
  const [district,setDistrict] = useState("");
  const [age,setAge ] = useState(0);
  let mail="";
  useEffect(
   () =>{
    const uid = cookie.load("firebaseUid");
    const headers = { "Authorization": uid };
    fetch("https://cowin-emailer-api.ieeevit.org/get", { headers }).then((response) =>{
      const data = response.json();
      return data;
    })
    .then((data)=>{console.log(data,"hereeee");
    if(data.user_exists)
    {
    setDistrict(data.data.district);
    setAge(data.data.age); 
    mail=data.data.email;
    }
  })
   
    },[]);

  return (
    <>
      <UserNavbar />
      <div className="bg2">
      <div className="container col-lg-6 col-xs-12 col-md-6 ">
      <div className="name"><h3>Fill in your details here!</h3></div> 
      <div className="maild"><h5>{mail} is here</h5></div> 
      <div className="form">
        <Form district={district} age={age}/>
      </div>
      <div><How /></div>
      <div className="bug">
      <button className="privacy white" >Report a bug</button>
      <button className="privacy white" >Privacy Policy</button>
      </div>
    </div>
    </div>
    <div className="container col-lg-12 col-xs-12 col-md-12 " id="otherresources">
    <div className="web"><h6><center>A curated list of websites that are actively helping all of us in this fight against the pandemic.</center></h6></div>
    <div className="row">
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
