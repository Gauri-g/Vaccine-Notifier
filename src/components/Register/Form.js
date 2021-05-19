import { useEffect, useState} from "react";
import Autocomplete from "../AutoComplete/Autocomplete";
import cookie from "react-cookies";
import "./Form.css"; 
import Modal from 'react-modal';
import ErrorModal from "./ErrorModal";
import image from "../../background/bg3.svg";
import "firebase/firestore"; 
require("firebase/auth");


const Form = (props) => { 
  const [edit, setEdit] = useState(false);
  const [selectedOption, setselectedOption] = useState(props.age || 0);
  const [district, setDistrict] = useState("");
  const [age, setAge] = useState(0);
  const [modalIsOpen,setIsOpen] = useState(false);
  const [show,setShow] = useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal(){
    setIsOpen(false);
    window.location.reload();
  }

  const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)', 
      borderRadius          : '8px',
      backgroundImage       : "url(" + image + ")",
      backgroundSize        : 'contain' ,
      backgroundRepeat      : 'no-repeat'
    } ,
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(128, 128, 128, 0.9)'
    },
  };
  
  useEffect(() => {
    setDistrict(props.district);
    setAge(props.age);
    if (district !== "" && edit === false) {
      setselectedOption(Number(age));
    }
  },[age,edit,district,props.age,props.district,show]);

  function onValueChange(event) {
    setselectedOption(event.target.value);
  }

  function submitHandler(event) {
    event.preventDefault();
    const uid = cookie.load("firebaseUid");
    const firecity = cookie.load("firebasecity"); 
    const requestOptions = {
      method: "PATCH",
      headers: { Authorization: uid },
      body: JSON.stringify({
        district: firecity,
        age: Number(selectedOption),
      }),
    };
    fetch(" https://cowin-emailer-api.ieeevit.org/update", requestOptions)
      .then((response) => {
        const data = response.json();
        return data;
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error.message); 
        setShow(true);
      });
  }

  const Editcall = () => {
    setEdit(true);
  };

  if(show===true)
  {
    console.log("yahah hu mein");
    return(<ErrorModal />);
  }

  if (district === "") {
    return (
      <>
        <div className="container">
          <form onSubmit={submitHandler}>
            <div className="row">
              <div className="col-lg-6 col-xs-12 col-md-6">
                <div className="text">
                  <h6>AGE GROUP</h6>
                </div>
                <div className="radio">
                  <label>
                    <input
                      type="radio"
                      value="all"
                      className="radiobtn"
                      checked={selectedOption === "all"}
                      onChange={onValueChange}
                    />
                    All
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="18"
                      className="radiobtn"
                      checked={Number(selectedOption) === 18}
                      onChange={onValueChange}
                    />
                    18-45
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="45"
                      className="radiobtn"
                      checked={Number(selectedOption) === 45}
                      onChange={onValueChange}
                    />
                    45+
                  </label>
                </div>
              </div>
              <div className="location col-lg-6 col-xs-12 col-md-6">
                <div>
                  <div className="text">
                    <h6>LOCATION</h6>
                  </div>
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
            <div>
              <button onClick={openModal} className="save"> Save details</button>
              <div className="container"> 
                <Modal 
                  isOpen={modalIsOpen} 
                  onRequestClose={closeModal}
                  style={customStyles}
                  ariaHideApp={false}
                  contentLabel="Example Modal" 
                >
                  <div className="container padding"> <center><div style={{marginTop:'30%',fontSize:'24px',color:'#3E64FF'}}>You have succesfully registered for the COWIN notifier.</div>
                  <div style={{marginTop:'5%',fontSize:'20px'}} >Make sure to keep an eye on your slots!</div>
                  <button onClick={closeModal} style={{backgroundColor: '#3E64FF', borderRadius : '8px', color:'white',padding:'10px 50px',borderColor:'white',fontSize:'18px',marginTop:'8%'}}>Close</button></center>
                  </div>
                </Modal> 
                </div>
            </div>
          </form>
        </div>
      </>
    );
  } else {
    if (edit) {
      return (
        <>
          <div className="container">
            <form onSubmit={submitHandler}>
              <div className="row">
                <div className="col-lg-6 col-xs-12 col-md-6 ">
                  <div className="text ">
                    <h6>AGE GROUP</h6>
                  </div>
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
                        checked={Number(selectedOption) === 18}
                        onChange={onValueChange}
                      />
                      18-45
                    </label>
                    <label>
                      <input
                        type="radio"
                        value="45"
                        checked={Number(selectedOption) === 45}
                        onChange={onValueChange}
                      />
                      45+
                    </label>
                  </div>
                </div>
                <div className="location col-lg-6 col-xs-12 col-md-6">
                  <div>
                    <div className="text ">
                      <h6>LOCATION</h6>
                    </div>
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
                      district={district}
                    />
                  </div>
                </div>
              </div>
              <div>
                <button onClick={openModal} className="save"> Update details</button>
                <div className="container"><Modal 
                  isOpen={modalIsOpen} 
                  onRequestClose={closeModal}
                  style={customStyles}
                  contentLabel="Example Modal" 
                >
                  <div className="container padding"> <center><div style={{marginTop:'30%',fontSize:'24px',color:'#3E64FF'}}>You have succesfully registered for the COWIN notifier.</div>
                  <div style={{marginTop:'5%',fontSize:'20px'}} >Make sure to keep an eye on your slots!</div>
                  <button onClick={closeModal} style={{backgroundColor: '#3E64FF', borderRadius : '8px', color:'white',padding:'10px 50px',borderColor:'white',fontSize:'18px',marginTop:'8%'}}>Close</button></center>
                  </div>
                </Modal> 
                </div>
              </div>
            </form>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="container">
            <form>
              <div className="row">
                <div className="col-lg-6 col-xs-12 col-md-6">
                  <div className="text">
                    <h6>AGE GROUP</h6>
                  </div>
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
                        checked={selectedOption === 18}
                      />
                      18-45
                    </label>
                    <label>
                      <input
                        type="radio"
                        value="45"
                        checked={selectedOption === 45}
                      />
                      45+
                    </label>
                  </div>
                </div>
                <div className="location col-lg-6 col-xs-12 col-md-6">
                  <div>
                    <div className="text">
                      <h6>LOCATION</h6>
                    </div>
                    <input
                      type="text"
                      className="search-box"
                      value={district}
                      readOnly
                    />
                  </div>
                </div>
              </div>
              <div>
                <button className="save" onClick={Editcall}>
                  Edit
                </button> 
              </div>
            </form>
          </div>
        </>
      );
    }
  }
};

export default Form;
