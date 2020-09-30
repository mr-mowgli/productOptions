import React from 'react';
import ReactDOM from 'react-dom';

const Details = ({product}) => {
  return (
    <div>
      <p>{product.name}</p>
      <p>{product.price}$</p>
      <p>{product.reviews} stars ({product.reviewCount} Reviews)</p>
    </div>
  )
}

export default Details;