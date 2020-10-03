import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

import {QtyDropdownContent, QtyBtn, BtnText, DropdownArrow} from '../styling/qtyDropdown.jsx';
import QtyNumber from './qtyNumber.jsx';

import alertWhenClickedOutside from '../utils/outsideClick.js'


const QtyDropDown = ({active, toggleClass, closeDropdown}) => {
  // returns range from 0 to max
  const createRange = (max) => {
    return Array.from(Array(99).keys());
  }

  // use a reference to keep track of clicks on/outside of the component
  const wrapperRef = useRef(null);
  alertWhenClickedOutside(wrapperRef, closeDropdown);

  return (
    <div ref={wrapperRef}>
      <QtyBtn onClick={()=> toggleClass()}>
        <BtnText>1</BtnText>
        <DropdownArrow>&#8964;</DropdownArrow>
      </QtyBtn>
      <QtyDropdownContent active={active}>
          {createRange(99).map( number => <QtyNumber number={number + 1} />)}
        </QtyDropdownContent>
    </div>
  )
}

export default QtyDropDown;