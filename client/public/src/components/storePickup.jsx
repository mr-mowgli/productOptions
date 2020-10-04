import React from 'react';
import ReactDOM from 'react-dom';

import {Flexbox, Flexrow, Flexcol} from '../styling/styles.jsx';
import {StockLeft, EditBtn, PickupBtnDiv, Pickuptext, StoreLocationStyle} from '../styling/storeStyle.jsx';

const StorePickup = ({qty, store}) => {

  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <Flexrow>
      <Flexbox>
        <Flexcol>
          <div>
            <Pickuptext qty={qty}>{qty > 0 ? 'Pick up today' : 'Out of stock'} </Pickuptext>
            at&nbsp;
            <StoreLocationStyle>{store.location ? capitalize(store.location) : ''} </StoreLocationStyle>
          </div>

          <EditBtn>Edit store</EditBtn>
          <StockLeft> {qty > 0 ? `Only ${qty} Left` : ''} </StockLeft>
        </Flexcol>
      </Flexbox>

      <PickupBtnDiv><button className='pickupBtn'>Pick up here</button></PickupBtnDiv>
    </Flexrow>
  )
}

export default StorePickup;