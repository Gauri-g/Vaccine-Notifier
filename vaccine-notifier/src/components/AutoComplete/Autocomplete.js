import userEvent from '@testing-library/user-event';
import React, { useEffect, useState,Component } from 'react';
import cookie from "react-cookies";
import "./Autocomplete.css";

const Autocomplete =({options,district}) =>
{
  // state = {
  //   activeOption: 0,
  //   filteredOptions: [],
  //   showOptions: false,
  //   userInput: ''
  // };
  // let options=[
  //   "Dehradun",
  //   "Kolkata",
  //   "Delhi",
  //   "Mumbai",
  //   "Banglore",
  //   "Vellore",
  //   "Agra"
  // ] 
  const [activeOption, setactiveOption] = useState(0);
  const [filteredOptions, setfilteredOptions] = useState([]);
  const [showOptions, setshowOptions] = useState(false);
  const [userInput, setuserInput] = useState(district|| "");
  console.log(userInput,"initial");
  const [disabled, setDisabled] = useState(district ? true : false);
   
  function onChange (e)  {
    console.log('onChanges');
    console.log(e.target.value);
    // const { options } = props;
    setuserInput(e.target.value);
      // setactiveOption(0);
      // setshowOptions(true);
  };

  useEffect(() => { 
    setfilteredOptions (options.filter(
      (optionName) =>
        {console.log(optionName.indexOf(userInput))
          return optionName.toLowerCase().indexOf(userInput.toLowerCase()) > -1}
    )
  )
      // setactiveOption(0);
      setshowOptions(true);
      // setfilteredOptions([]);
      // setuserInput(activeOption.innerText)  
    // cookie.save("firebasecity", activeOption.innerText, { path: "/" });
  },[userInput]);

  function onSelect(e) {
    setactiveOption(0);
      setshowOptions(false);
      setfilteredOptions([]);
      setuserInput(e.currentTarget.innerText)  
    cookie.save("firebasecity", e.currentTarget.innerText, { path: "/" });
  };

  function onKeyDown (e) {
    // const { activeOption, filteredOptions } = this.state;
    if (e.keyCode === 13) {
      setactiveOption(0);
      setshowOptions(false);
      setuserInput(filteredOptions[activeOption]);
    } else if (e.keyCode === 38) {
      if (activeOption === 0) {
        return;
      }
      setactiveOption(activeOption - 1 ); 
    } else if (e.keyCode === 40) {
      if (activeOption === filteredOptions.length - 1) {
        console.log(activeOption);
        return;
      }
      setactiveOption(activeOption + 1 ); 
    }
  };

  // render() {
  //   const {
  //     onChange,
  //     onClick,
  //     onKeyDown,

  //     state: { activeOption, filteredOptions, showOptions, userInput }
  //   } = this;
    let optionList;
    if (showOptions && userInput) {
      if (filteredOptions.length) {
        optionList = (
          <ul className="options" >
            {filteredOptions.map((optionName, index) => {
              let className;
              if (index === activeOption) {
                className = 'option-active';
              }
              return (
                <li className={className} key={optionName} onClick={onSelect} >
                  {optionName}
                </li>
              );
            })}
          </ul>
        );
      } else {
        optionList = (
          <div className="no-options">
            <em>No Option!</em>
          </div>
        );
      }
    }
    return (
      <React.Fragment>
        <div className="search">
          <input
            type="text"
            className="search-box"
            onChange={onChange} 
            onKeyDown={onKeyDown}
            id="" 
            placeholder={district}
            value={userInput}
          />
        </div>
        {optionList}
      </React.Fragment>
    );
  }


export default Autocomplete;
