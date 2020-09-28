// import _ from 'lodash';

//   function component() {
//     const element = document.createElement('div');

//     element.innerHTML = _.join(['Hello,', 'webpack is working!'], ' ');

//     return element;
//   }

//   document.body.appendChild(component());

import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import App from './app.jsx';



ReactDOM.render(<App/>, document.getElementById('app'));