import React from 'react';
import ReactDOM from 'react-dom';

import StorePickup from './storePickup.jsx';

import {Flexbox, Flexrow, Flexcol} from '../styling/styles.jsx';
import {StockLeft, EditStoreBtn, PickupBtnDiv, Pickuptext, StoreLocationStyle} from '../styling/storeStyle.jsx';

const Store = ({store, qty}) => {

  return (
    <div>
      <StorePickup qty={qty} store={store}/>
    </div>
  )
}

export default Store;