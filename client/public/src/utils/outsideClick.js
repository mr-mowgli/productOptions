import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';


const alertWhenClickedOutside = (ref, cb) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        console.log('outside click!');
        cb();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [ref]);
}

export default alertWhenClickedOutside;