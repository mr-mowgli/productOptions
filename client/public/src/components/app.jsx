import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Details from './details.jsx';
import Options from './options.jsx';

const App = () => {
  const [product, setProduct] = useState({id: 1});
  const [store, setStore] = useState({id: 1});
  const [allStores, setAllStores] = useState([]);
  const [stock, setStock] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);

  // get the products general details such as price, name and reviews
  const getProduct = async (productId) => {
    const response = await axios.get(`/products/${productId}`);
    const productData = response.data[0];
    setProduct(productData);
  }

  const getStore = async (storeId) => {
    const response = await axios.get(`/stores/${storeId}`);
    const storeData = response.data[0];
    setStore(storeData);
  }

  // get a list of all the stores (names and ids)
  const getAllStores = async () => {
    const response = await axios.get(`/stores`);
    const storesData = response.data;
    setAllStores(storesData);
  }

  // get all available stock for the selected item in the selected store
  const getStock = async (productId) => {
    const response = await axios.get(`/stock/${productId}`);
    const stockData = response.data;
    // filter to only have the selected store's stock for the selected product
    const productStock = stockData.filter(item => item.location === store.location);
    setStock(productStock);
    // extract colors and sizes from the product stock
    var colors = {};
    var sizes = {};
    productStock.forEach( item => {
      // adding colors and sizes keys only once, in one iteration
      if ( !colors[item.color] ) { colors[item.color] = true }
      if ( !sizes[item.size] ) { sizes[item.size] = true }
    });
    // extracting as arrays
    setColors(Object.keys(colors));
    setSizes(Object.keys(sizes));
  }

  useEffect( () => {
     getProduct(product.id);
     getStore(store.id);
     getAllStores();
     getStock(product.id);
    // passing in this array as a second parameter re-renders only if one of the elements change
  }, [product.id, store.id, stock.length, allStores.length])

    return (
      <div>
        <Details product={product} />
        <Options stock={stock} colors={colors} sizes={sizes} />
        {/* <Store /> */}
      </div>
    )
}

export default App;