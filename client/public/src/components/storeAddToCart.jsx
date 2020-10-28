import React from 'react';
import ReactDOM from 'react-dom';

import {AddtoCartFlex} from '../styling/styles.jsx';
import {AddToCartStyle, AddtoCartText} from '../styling/storeStyle.jsx';


const AddToCart = ({addToShopCart, buyQty}) => {
  return (
    <AddToCartStyle>
      <AddtoCartFlex onClick={() => addToShopCart(buyQty)}>
        <img src='https://qtlyimages.s3-us-west-2.amazonaws.com/targetBox.png' alt='targetbox'></img>
        <AddtoCartText>Add to registry</AddtoCartText>
      </AddtoCartFlex>
    </AddToCartStyle>
  )
}

export default AddToCart;
