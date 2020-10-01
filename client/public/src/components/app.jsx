import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Details from './details.jsx';
import Options from './options.jsx';
import Store from './store.jsx';

const App = () => {
  const [stores, setStores] = useState([]);
  const [stock, setStock] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);

  const [store, setStore] = useState({id: 1});
  const [product, setProduct] = useState({id: 1});
  const [color, setColor] = useState('red');
  const [size, setSize] = useState('M');
  const [qty, setQty] = useState(0);

  // get the products general details such as price, name and reviews
  const getProduct = async (productId) => {
    const response = await axios.get(`/products/${productId}`);
    const productData = response.data;
    setProduct(productData);
  }

  // get a store's id and location
  const getStore = async (storeId) => {
    const response = await axios.get(`/stores/${storeId}`);
    const storeData = response.data;
    setStore(storeData);
  }

  // get a list of all the stores (names and ids)
  const getStores = async () => {
    const response = await axios.get(`/stores`);
    const storesData = response.data;
    setStores(storesData);
  }

  // get all available stock for the selected item in the selected store
  const getStock = async (productId) => {
    const response = await axios.get(`/stock/${productId}`);
    const stockData = response.data;
    // filter to only have the selected store's stock for the selected product
    const productStock = stockData.filter(item => item.location === store.location);
    setStock(productStock);
    }

    // extract colors and sizes options from the product stock
  const getColorsAndSizes = () => {
    var colors = {};
    var sizes = {};
    stock.forEach( item => {
      // adding colors and sizes keys only once, in one iteration
      if ( !colors[item.color] ) { colors[item.color] = true }
      if ( !sizes[item.size] ) { sizes[item.size] = true }
    });
    // extracting as arrays
    setColors(Object.keys(colors));
    setSizes(Object.keys(sizes));
  }

  const getQty = () => {
    for (var product of stock) {
      if (product.color === color && product.size === size) {
         setQty(product.qty);
      }
     }
  }

  useEffect( () => {
    getProduct(product.id);
    getStore(store.id);
    getStores();
    getStock(product.id);
    getColorsAndSizes();
    getQty();
    // passing in this array as a second parameter re-renders only if one of the elements change
  }, [store.location, stock.length])

    return (
      <div>
        <Details product={product} />
        <Options colors={colors} sizes={sizes}/>
        <Store store={store} qty={qty}/>
      </div>
    )
}


export default App;