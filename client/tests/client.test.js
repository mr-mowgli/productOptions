import {shallow, mount, configure} from 'enzyme';
import {render, screen} from '@testing-library/react'
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import App from '../public/src/components/app.jsx'
import Options from '../public/src/components/options.jsx'
import Store from '../public/src/components/store.jsx'
import Details from '../public/src/components/details.jsx'

configure({ adapter: new Adapter() });

describe('test environment should be set up correctly', () => {
  test('should always pass', () => {
    expect(true).toBe(true);
  })
})

describe('App should have the correct components rendering', () => {
  let wrapper = shallow(<App />);
  test('App should have an options component', () => {
    expect(wrapper.children().find('Options').exists()).toBe(true);
  })
  test('App should have an details component', () => {
    expect(wrapper.children().find('Details').exists()).toBe(true);
  })
  test('App should have an store component', () => {
    expect(wrapper.children().find('Store').exists()).toBe(true);
  })
})

describe('Options should contain the correct elements', () => {
  let colors = ['red', 'blue', 'black'];
  let sizes = ['S', 'M', 'L'];
  let wrapper = shallow(<Options colors={colors} sizes={sizes}/>);
  test('Options should have an element with a class name of colorsGrid', () => {
    expect(wrapper.children().someWhere(n => n.hasClass('colorsGrid'))).toBe(true);
  })
  test('Options should have an element with a class name of sizesGrid', () => {
    expect(wrapper.children().someWhere(n => n.hasClass('sizesGrid'))).toBe(true);
  })
})

describe('Store should contain the correct elements', () => {
  let store = {id: 1, location: 'somewhere'};
  let qty = 10;
  let wrapper = shallow(<Store store={store} qty={qty}/>);
  test('Store should have an element with a class name of storeLocation', () => {
    expect(wrapper.children().someWhere(n => n.hasClass('storeLocation'))).toBe(true);
  })
  test('Store should have an element with a class name of qty', () => {
    expect(wrapper.children().someWhere(n => n.hasClass('qty'))).toBe(true);
  })
})

describe('Details should contain the correct elements', () => {
  let product = {id: 4, name: 'test item', reviews: 4.83, reviewCount: 59};
  let wrapper = shallow(<Details product={product} />);
  test('Details should contain three p elements', () => {
    expect(wrapper.getElements('p')[0].props.children.length).toBe(3);
  })
})

