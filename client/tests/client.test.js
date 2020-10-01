import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import ReactDOM from 'react-dom';

import App from '../public/src/components/app.jsx'
import Details from '../public/src/components/details.jsx'
import Options from '../public/src/components/options.jsx'

configure({ adapter: new Adapter() });

test('should always pass', () => {
  expect(true).toBe(true);
})

let wrapper = shallow(<App />);
test('expect app to have two components', () => {
  debugger;
  console.log(wrapper.debug());
})