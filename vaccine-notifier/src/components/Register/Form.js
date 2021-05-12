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
    const [edit, setEdit] = useState(false); 
    const [selectedOption, setselectedOption] = useState(props.age||0);
    const [district, setDistrict] = useState("");
    const [age, setAge] = useState(0); 

    useEffect(()=>{setDistrict(props.district);
    setAge(props.age); 
    if(district!=="" && edit === false)
    { 
      setselectedOption(props.age); 
    }
    });
   
    function onValueChange(event) {
      setselectedOption(event.target.value);
    }
  
    function submitHandler(event) {
      event.preventDefault();
      const uid = cookie.load("firebaseUid");
      const firecity = cookie.load("firebasecity");
      // const db = firebase.firestore();
      // db.collection("users")
      //   .doc(uid)
      //   .update({
      //     city: firecity,
      //     age: selectedOption,
      //   })
      //   .then((docRef) => {
      //     console.log("Document written with ID: ", docRef.id);
      //   })
      //   .catch((error) => {
      //     console.error("Error adding document: ", error);
      //   });

      const requestOptions = {
        method: 'PATCH',
        headers: { "Authorization": uid },
        body:JSON.stringify({
          district: firecity,
          age: Number(selectedOption),
        })
    };
      fetch(" http://34.93.10.131/update",requestOptions ).then((response) =>{
        const data = response.json();
        return data;
      })
      .then((data)=>{console.log(data)})
    } 

    const Editcall = () => {
      setEdit(true);
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
                  checked={selectedOption == "all"}
                  onChange={onValueChange}
                />
                All
              </label>
              <label>
                <input
                  type="radio"
                  value="18"
                  checked={selectedOption == 18}
                  onChange={onValueChange}
                />
                18-45
              </label>
              <label>
                <input
                  type="radio"
                  value="45"
                  checked={selectedOption == 45}
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
          <div><button className="save"> Save details</button> </div>
      
        </form>
        </div>
      </>
    )
   }

   else  
   {  
     if(edit){
     return(
         <>
         <div className="container">
         <form onSubmit={submitHandler}>
           <div className="row">
           <div className="col-lg-6 col-xs-12 col-md-6 ">
             <div className="text "><h6>AGE GROUP</h6></div>
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
                   checked={selectedOption == 18}
                   onChange={onValueChange} 
                 />
                 18-45
               </label>
               <label>
                 <input
                   type="radio"
                   value="45"
                   checked={selectedOption == 45}
                   onChange={onValueChange} 
                 />
                 45+
               </label>
             </div>
           </div>
           <div className="location col-lg-6 col-xs-12 col-md-6">
             <div>
             <div className="text "><h6>LOCATION</h6></div>
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
           <div><button class="save" > Update details</button> </div>
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
                 />
                 All
               </label>
               <label>
                 <input
                   type="radio"
                   value="18"
                   checked={selectedOption == 18} 
                 />
                 18-45
               </label>
               <label>
                 <input
                   type="radio"
                   value="45"
                   checked={selectedOption == 45} 
                 />
                 45+
               </label>
             </div>
           </div>
           <div className="location col-lg-6 col-xs-12 col-md-6">
             <div>
             <div className="text"><h6>LOCATION</h6></div>
             <input
            type="text"
            className="search-box" 
            value={district}
            readOnly
          />
       </div>
       </div> 
       </div>
           <div><button class="save"  onClick={Editcall}> Edit</button> </div>
         </form>
         </div>
       </>
     )
    }
  }


};

export default Form;