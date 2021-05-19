import { useEffect, useState} from "react";
import Autocomplete from "../AutoComplete/Autocomplete";
import cookie from "react-cookies";
import "./Form.css"; 
import Modal from 'react-modal';
import ErrorModal from "./ErrorModal";
import "firebase/firestore";
require("firebase/auth");


const Form = (props) => { 
  const [edit, setEdit] = useState(false);
  const [selectedOption, setselectedOption] = useState(props.age || 0);
  const [district, setDistrict] = useState("");
  const [age, setAge] = useState(0);
  const [modalIsOpen,setIsOpen] = useState(false);
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
      transform             : 'translate(-50%, -50%)'
    }
  };
  
  useEffect(() => {
    setDistrict(props.district);
    setAge(props.age);
    if (district !== "" && edit === false) {
      setselectedOption(Number(age));
    }
  },[age,edit,district,props.age,props.district]);

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
        <ErrorModal />
        window.location("/")
      });
  }

  const Editcall = () => {
    setEdit(true);
  };

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
                  <div className="text">Icon</div> 
                  <div className="text">You have succesfully registered for the COWIN notifier.</div>
                  <div className="text">Make sure to keep an eye on your slots!</div>
                  <button onClick={closeModal} className="button text">close</button>
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
                  <div className="text">Icon</div> 
                  <div className="text">You have succesfully registered for *website name*</div>
                  <div className="text">Keep a lookout for any future alerts on vaccine availibilty</div>
                  <button onClick={closeModal} className="button text">close</button>
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
