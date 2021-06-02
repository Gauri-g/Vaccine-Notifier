import React from "react";
import "./Form.css";
import Modal from "react-modal";
import Select from "react-select";
import { list } from "./cities";
import doctors from "../../assets/doctors.png";
import "firebase/firestore";
require("firebase/auth");

const Form = ({
  district,
  age,
  setDistrict,
  setAge,
  modalIsOpen,
  setIsOpen,
  submitHandler,
  edit,
  setEdit,
}) => {
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
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(8, 8, 8, 0.6)",
    },
  };

  //   useEffect(() => {
  //     setDistrict(props.district);
  //     setAge(props.age);
  //     if (district !== "" && edit === false) {
  //       setselectedOption(Number(age));
  //     }
  //   }, [age, edit, district, props.age, props.district, show]);

  const selectData = (event) => {
    setAge(event.target.value);
  };

  const cityOptions = list.map((i) => {
    return { label: i, value: i };
  });

  const industryChangeHandler = (value) => {
    setDistrict(value.value);
  };

  const colourStyles = {
    control: (styles) => ({
      ...styles,
      overflow: "hidden",
      color: "#3e64ff",
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
      color: "#3e64ff",
      height: "100%",
      margin: "0",
    }),
    input: (styles) => ({
      ...styles,
      color: "#3e64ff",
      padding: "1",
      width: "140px",
    }),
    menu: (styles) => ({
      ...styles,
      color: "#3e64ff",
      width: "15rem",
      marginTop: "0rem",
      marginLeft: "0rem",
    }),
  };

  return (
    <>
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
      <div className="form-container">
        <div className="container-row">
          <div className="container-row-column">
            <h6 className="text">AGE GROUP</h6>
            {edit ? (
              <div className="radio" onChange={selectData}>
                <div>
                  <input
                    className="radiobtn"
                    type="radio"
                    value="18"
                    name="data"
                  />
                  {"  18-45"}
                </div>
                <div>
                  <input
                    className="radiobtn"
                    type="radio"
                    value="45"
                    name="data"
                  />
                  {"  45"}
                </div>
              </div>
            ) : (
              <p>{age === 18 ? "18-45" : "45"}</p>
            )}
          </div>
          <div className="container-row-column">
            <h6 className="text">LOCATION</h6>
            {edit ? (
              <Select
                placeholder="Ex: Mumbai"
                options={cityOptions}
                onChange={industryChangeHandler}
                styles={colourStyles}
              />
            ) : (
              <p>{district}</p>
            )}
          </div>
        </div>
        <button onClick={edit ? submitHandler : setEdit} className="save">
          {edit ? "Save" : "Edit"} details
        </button>
      </div>
    </>
  );
};

export default Form;
