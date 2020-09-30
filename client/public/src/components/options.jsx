import React, {Component} from 'react';
import ReactDOM from 'react-dom';

const Options = ({stock, colors, sizes}) => {
  return (
    <div>
      <div>
        {colors.map(color => color + ' ')}
      </div>
      <div>
        <br></br>
        {sizes.map(size => size + ' ')}
      </div>

    </div>
  )
}

export default Options;