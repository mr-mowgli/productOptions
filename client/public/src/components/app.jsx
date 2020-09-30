import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Details from './details.jsx';
import Options from './options.jsx';

const App = () => {
  const [productId, setProductId] = useState(1);
  const [product, setProduct] = useState({});
  const [storeId, setStoreId] = useState(1);
  const [stores, setStore] = useState([]);
  const [stock, setStock] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);

  // get the products general details such as price, name and reviews
  const getProduct = async (productId) => {
    const response = await axios.get(`http://localhost:3000/products/${productId}`);
    const productData = await response.data[0];
    setProduct(productData);
  }

  // get a list of all the stores (names and ids)
  const getStores = async () => {
    const response = await axios.get(`http://localhost:3000/stores`);
    const storesData = await response.data;
    setStore(storesData);
  }

  // get all available stock for the selected item in the selected store
  const getStock = async (productId, stores) => {
    const response = await axios.get(`http://localhost:3000/stock/${productId}`);
    const stockData = await response.data;
    // find the store that matches the selected store state
    const selectedStore = await stores.find(store => store.id === storeId);
    if (selectedStore !== undefined) {
      // filter to only have the selected store's stock for the selected product
      const productStock = await stockData.filter(item => item.location === selectedStore.location);
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
  }

  useEffect( () => {
     getProduct(productId);
     getStores();
     getStock(productId, stores);
    // passing in this array as a second parameter re-renders only if one of the elements change
  }, [productId, storeId, stock.length, stores.length])

    return (
      <div>
        <Details product={product} />
        <Options stock={stock} colors={colors} sizes={sizes} />
      </div>
    )
}

export default App;