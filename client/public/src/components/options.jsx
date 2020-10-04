import React from 'react';
import ReactDOM from 'react-dom';

import {SelectedOption, ColorsGrid, Color, SizesGrid, Size, ColorHighlight, SizeHighlight} from '../styling/optionsStyle.jsx';

const Options = ({colors, sizes, setActiveColor, setActiveSize, activeColor, activeSize}) => {

  return (
    <div>
      <SelectedOption><span>color</span> {activeColor}</SelectedOption>
      <ColorsGrid>
        {colors.map((color, i) =>
        <ColorHighlight selectedColor={color === activeColor} key={i} onClick={() => setActiveColor(color)}>
          <Color color={color}></Color>
        </ColorHighlight>
          )}
      </ColorsGrid>

      <SelectedOption><span>size</span> {activeSize}</SelectedOption>
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