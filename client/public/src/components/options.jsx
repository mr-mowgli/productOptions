import React from 'react';
import ReactDOM from 'react-dom';

import {ColorsGrid, Color, SizesGrid, Size, ColorHighlight, SizeHighlight} from '../styling/grids.jsx';

const Options = ({colors, sizes, setActiveColor, setActiveSize, activeColor, activeSize}) => {

  return (
    <div>
      <ColorsGrid>
        {colors.map((color, i) =>
        <ColorHighlight selectedColor={color === activeColor} key={i}>
          <Color
            color={color}
            onClick={() => setActiveColor(color)}
            >
          </Color>
        </ColorHighlight>
          )}
      </ColorsGrid>

      <SizesGrid>
        {sizes.map((size, i) =>
        <SizeHighlight  key={i}>
          <Size selectedSize={size === activeSize}
            onClick={() => setActiveSize(size)}
            >{size}
          </Size>
        </SizeHighlight>
        )}
      </SizesGrid>

    </div>
  )
}

export default Options;