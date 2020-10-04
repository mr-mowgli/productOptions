import React from 'react';
import ReactDOM from 'react-dom';

import {AddtoCartFlex} from '../styling/styles.jsx';
import {AddToCartStyle, AddtoCartText} from '../styling/storeStyle.jsx';


const AddToCart = () => {
  return (
    <AddToCartStyle>
      <AddtoCartFlex>
        <img src='targetbox.png' alt='targetbox'></img>
        <AddtoCartText>Add to registry</AddtoCartText>
      </AddtoCartFlex>
    </AddToCartStyle>
  )
}

export default AddToCart;