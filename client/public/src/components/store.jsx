import React from 'react';
import ReactDOM from 'react-dom';

const Store = ({store, qty}) => {

  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

return (
  <div>
    <div className='storeLocation'>{store.location ? capitalize(store.location) : ''}</div>
    <div className='qty'>{qty} Left</div>
  </div>
)
}

export default Store;