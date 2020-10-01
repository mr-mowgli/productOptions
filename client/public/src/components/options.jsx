import React from 'react';
import ReactDOM from 'react-dom';

const Options = ({colors, sizes}) => {
  return (
    <div>
      <div className='colorsGrid'>
        {colors.map(color => color + ' ')}
      </div>
        <br></br>
      <div className='sizesGrid'>
        {sizes.map(size => size + ' ')}
      </div>

    </div>
  )
}

export default Options;