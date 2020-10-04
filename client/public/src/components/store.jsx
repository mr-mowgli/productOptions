import React from 'react';
import ReactDOM from 'react-dom';

import StorePickup from './storePickup.jsx';
import StoreDeliveryAvailablity from './storeDeliveryAvailablity.jsx';
import StoreOrderDelivery from './storeOrderDelivery.jsx';
import StoreAddToCart from './storeAddToCart.jsx';

const Store = ({store, qty}) => {

  return (
    <div>
      <StorePickup qty={qty} store={store}/>
      <StoreDeliveryAvailablity qty={qty} store={store}/>
      <StoreOrderDelivery qty={qty} store={store}/>
      <StoreAddToCart />
    </div>
  )
}

export default Store;