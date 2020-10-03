import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

import {QtyDropdownContent} from '../styling/qtyDropdown.jsx';
import QtyNumber from './qtyNumber.jsx';

const alertWhenClickedOutside = (ref) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        console.log('outside click!');
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [ref]);
}

const QtyDropDown = ({active}) => {

  // returns range form 0 to max
  const createRange = (max) => {
    return Array.from(Array(99).keys());
  }

  const wrapperRef = useRef(null);
  alertWhenClickedOutside(wrapperRef);
  return (
    <div ref={wrapperRef}>
      <QtyDropdownContent active={active}>
          {createRange(99).map( number => <QtyNumber number={number + 1} />)}
        </QtyDropdownContent>
    </div>
  )
}

export default QtyDropDown;