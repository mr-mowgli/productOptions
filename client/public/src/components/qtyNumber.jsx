import React from 'react';
import ReactDOM from 'react-dom';

import {DropdownNumber} from '../styling/qtyDropdown.jsx';

const QtyNumber = ({number}) => {
  return (
    <DropdownNumber>
      {number}
    </DropdownNumber>
  )
}

export default QtyNumber;