import { useEffect, useState } from "react";
import cookie from "react-cookies";
import "./Form.css";
import Modal from "react-modal";
import Select from "react-select";
import ErrorModal from "./ErrorModal";
import axios from "axios";
import { list } from "./cities";
import doctors from "../../assets/doctors.png";
import "firebase/firestore";
require("firebase/auth");

const Form = (props) => {
  const [edit, setEdit] = useState(false);
  const [district, setDistrict] = useState("");
  const [age, setAge] = useState(0);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [show, setShow] = useState(false);

  function closeModal() {
    setIsOpen(false);
    window.location.reload();
  }

  const modalStyles = {
    content: {
      borderRadius: "10px",
      backgroundColor: "#3e64ff",
      padding: "0",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  //   useEffect(() => {
  //     setDistrict(props.district);
  //     setAge(props.age);
  //     if (district !== "" && edit === false) {
  //       setselectedOption(Number(age));
  //     }
  //   }, [age, edit, district, props.age, props.district, show]);

  const submitHandler = () => {
    const uid = cookie.load("key");
    if (district === "") {
      return window.alert("Kindly enter district.");
    }
    console.log(district);
    console.log(age);
    const body = {
      district,
      age: Number(age),
    };
    console.log(body);
    const headers = { Authorization: uid };
    axios
      .put(`${process.env.REACT_APP_BACKEND_URL}/update`, body, { headers })
      .then((response) => {
        console.log(response);
        setIsOpen(true);
      })
      .catch((error) => {
        console.log(error.message);
        setShow(true);
      });
  };

  const Editcall = () => {
    setEdit(true);
  };

  if (show === true) {
    console.log("yahah hu mein");
    return <ErrorModal />;
  }

  const selectData = (event) => {
    setAge(event.target.value);
  };

  const cityOptions = list.map((i) => {
    return { label: i, value: i };
  });

  const industryChangeHandler = (value) => {
    console.log(value.value);
    setDistrict(value.value);
  };

  const colourStyles = {
    control: (styles) => ({
      ...styles,
      overflow: "hidden",
      color: "#8c8c8c",
      border: "1px solid rgb(191, 191, 191)",
      boxSizing: "border-box",
      borderRadius: "5px",
      backgroundColor: "rgb(249, 249, 249)",
      minHeight: "3.8vh",
      height: "fit-content",
      fontSize: 14,
      fontWeight: 450,
    }),
    indicatorSeparator: (styles) => ({
      ...styles,
      height: "100%",
      margin: "0",
    }),
    input: (styles) => ({
      ...styles,
      padding: "1",
      width: "140px",
    }),
    menu: (styles) => ({
      ...styles,
      width: "15rem",
      marginTop: "0rem",
      marginLeft: "0rem",
      color: "black",
    }),
  };

  return (
    <>
      <div className="container">
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={modalStyles}
          ariaHideApp={false}
          contentLabel="Example Modal"
        >
          <div className="modal-container">
            <div className="modal-header">
              <p className="modal-header-title">Covid-19 Vaccination</p>
              <img
                src={doctors}
                alt="covid19vacination"
                width="188px"
                height="164px"
              />
            </div>
            <div className="modal-body">
              <p className="modal-body-success">
                You have succesfully registered for the COWIN notifier.
              </p>
              <p className="modal-body-lookout">
                Keep a lookout for any future alerts on vaccine availibilty
              </p>
              <button
                onClick={closeModal}
                style={{
                  backgroundColor: "#3E64FF",
                  borderRadius: "8px",
                  color: "white",
                  padding: "10px 50px",
                  borderColor: "white",
                  fontSize: "18px",
                  marginTop: "8%",
                }}
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
        <div className="row">
          <div className="col-lg-6 col-xs-12 col-md-6">
            <h6 className="text">AGE GROUP</h6>
            <div className="radio" onChange={selectData}>
              {/* <input className="radiobtn" type="radio" value="0" name="data" />
              {"All"} */}
              <div>
                <input
                  className="radiobtn"
                  type="radio"
                  value="18"
                  name="data"
                />
                {"18-45"}
              </div>
              <div>
                <input
                  className="radiobtn"
                  type="radio"
                  value="45"
                  name="data"
                />
                {"45"}
              </div>
            </div>
          </div>
          <div className="location col-lg-6 col-xs-12 col-md-6">
            <div>
              <div className="text">
                <h6>LOCATION</h6>
              </div>
              <Select
                placeholder="Ex: Mumbai"
                options={cityOptions}
                onChange={industryChangeHandler}
                styles={colourStyles}
              />
            </div>
          </div>
        </div>
        <button onClick={submitHandler} className="save">
          Save details
        </button>
      </div>
    </>
  );
};

export default Form;
