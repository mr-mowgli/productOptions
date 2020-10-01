import React from 'react';
import ReactDOM from 'react-dom';

const Store = ({store, qty}) => {

  const capitalize = (string) => {
    // debugger;
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

return (
  <div>
    <div>{store.location ? capitalize(store.location) : ''}</div>
    <div>{qty} Left</div>
  </div>
)
}

export default Store;