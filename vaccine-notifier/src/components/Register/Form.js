import { useEffect, useContext, useState, useRef } from "react";
import Autocomplete from "../AutoComplete/Autocomplete";
import cookie, { removeCookie } from "react-cookies";
import { logOut } from "../../services/firebase";
import "./Form.css";
import firebase from "firebase/app";
import "firebase/firestore";
require("firebase/auth");

const Form = (props) => {
    const cityRef = useRef("");
    const [selectedOption, setselectedOption] = useState("");
    const [district, setDistrict] = useState("");
    const [age, setAge] = useState("");
    useEffect(()=>{setDistrict(props.district);
    setAge(props.age);
    if(props.district!="")setselectedOption(props.age);
    });
   
    function onValueChange(event) {
      setselectedOption(event.target.value);
    }
  
    function submitHandler(event) {
      event.preventDefault();
      const uid = cookie.load("firebaseUid");
      const firecity = cookie.load("firebasecity");
      const db = firebase.firestore();
  
      db.collection("users")
        .doc(uid)
        .update({
          city: firecity,
          age: selectedOption,
        })
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    } 

    if(district==="")
  {
    return(
        <>
        <div className="container">
        <form onSubmit={submitHandler}>
          <div className="row">
          <div className="col-lg-6 col-xs-12 col-md-6">
            <div className="text"><h6>AGE GROUP</h6></div>
            <div className="radio">
              <label>
                <input
                  type="radio"
                  value="all"
                  checked={selectedOption === "all"}
                  onChange={onValueChange}
                />
                All
              </label>
              <label>
                <input
                  type="radio"
                  value="18"
                  checked={selectedOption === "18"}
                  onChange={onValueChange}
                />
                18-45
              </label>
              <label>
                <input
                  type="radio"
                  value="45"
                  checked={selectedOption === "45"}
                  onChange={onValueChange}
                />
                45+
              </label>
            </div>
          </div>
          <div className="location col-lg-6 col-xs-12 col-md-6">
            <div>
            <div className="text"><h6>LOCATION</h6></div>
          <Autocomplete
        options={[
          "Dehradun",
          "Kolkata",
          "Delhi",
          "Mumbai",
          "Banglore",
          "Vellore",
          "Agra",
          "Dengra",
          "Denmark",
        ]}
      />
      </div>
      </div> 
      </div>
          <div><button class="save"> Save details</button> </div>
      
        </form>
        </div>
      </>
    )
   }
   else
   {
     return(
         <>
         <div className="container">
         <form>
           <div className="row">
           <div className="col-lg-6 col-xs-12 col-md-6">
             <div className="text"><h6>AGE GROUP</h6></div>
             <div className="radio">
               <label>
                 <input
                   type="radio"
                   value="all"
                   checked={selectedOption === "all"}
                   onChange={onValueChange}
                   disabled = {age === "all" ? false :true}
                 />
                 All
               </label>
               <label>
                 <input
                   type="radio"
                   value="18"
                   checked={selectedOption === "18"}
                   onChange={onValueChange}
                   disabled = {age === "18" ? false :true}
                 />
                 18-45
               </label>
               <label>
                 <input
                   type="radio"
                   value="45"
                   checked={selectedOption === "45"}
                   onChange={onValueChange}
                   disabled = {age == "45" ? false :true}
                 />
                 45+
               </label>
             </div>
           </div>
           <div className="location col-lg-6 col-xs-12 col-md-6">
             <div>
             <div className="text"><h6>LOCATION</h6></div>
           <Autocomplete
         options={[
          "Dehradun",
          "Kolkata",
          "Delhi",
          "Mumbai",
          "Banglore",
          "Vellore",
          "Agra",
          "Dengra",
          "Denmark",
        ]} district={district}
       />
       </div>
       </div> 
       </div>
           <div><button class="save"> Edit</button> </div>
         </form>
         </div>
       </>
     )
    }
};

export default Form;