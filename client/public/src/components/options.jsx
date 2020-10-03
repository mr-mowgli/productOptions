import React from 'react';
import ReactDOM from 'react-dom';

import {ColorsGrid, Color, SizesGrid, Size} from '../styling/grids.jsx';

const Options = ({colors, sizes, setActiveColor, setActiveSize}) => {

  return (
    <div>
      <ColorsGrid>
        {colors.map((color, i) =>
        <div key={i} className="highlightBorder">
          <Color
            color={color}
            onClick={() => setActiveColor(color)}
            >
          </Color>
        </div>
          )}
      </ColorsGrid>

      <SizesGrid>
        {sizes.map((size, i) =>
        <Size
          onClick={() => setActiveSize(size)}
          key={i}>{size}
        </Size>)}
      </SizesGrid>

    </div>
  )
}

export default Options;