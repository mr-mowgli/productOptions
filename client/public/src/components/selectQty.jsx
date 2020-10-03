import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

import QtyDropDown from './qtyDropdown.jsx';

import {SelectQtyContainer, SelectQtyTitle, QtyBtn, BtnText,
  DropdownArrow} from '../styling/qtyDropdown.jsx';


const SelectQty = () => {
  const [dropdownState, setDropDownState] = useState({active: false});

  const toggleClass = () => {
    var newState = !dropdownState.active;
    setDropDownState({active: newState});
  }



  useEffect( () => {}, [dropdownState]);



  return (
    <SelectQtyContainer>
      <SelectQtyTitle>Quantity</SelectQtyTitle>
      <QtyBtn onClick={()=> toggleClass()}>
        <BtnText>1</BtnText>
        <DropdownArrow>&#8964;</DropdownArrow>
      </QtyBtn>
        <QtyDropDown active={dropdownState.active}/>
    </SelectQtyContainer>
  )
}

export default SelectQty

