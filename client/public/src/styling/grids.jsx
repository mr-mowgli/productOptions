import styled from 'styled-components';

export const ColorsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 0.04fr);
  margin: 20px 0;
`;

export const ColorHighlight = styled.div`
  cursor: pointer;
  border: ${props => props.selectedColor ? '2px solid green' : '2px solid white' };
  border-radius: 2px;
  width: 48px;
  height: 48px;
  :hover { border: 2px solid green }
  :active { background-color: rgb(20, 20, 20) }
`;

export const Color = styled.div`
  height: 35px;
  background-color: ${props => props.color};
  border: 0.5px solid rgb(90, 90, 90);
  border-radius: 2px;
  margin: 5px;
`;

export const SizesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 0.04fr);
  margin-bottom: 20px 0;
  grid-row-gap: 0.5ch;
  grid-column-gap: 0.5ch;
  margin-bottom: 20px;
`;

export const SizeHighlight = styled.div`

  border-radius: 2px;
  width: 50px;
  height: 25px;
  line-height: 25px;
  // :hover { border: 0.5px solid green; }
`;

export const Size = styled.div`
  position: relative;
  cursor: pointer;
  background-color: ${props => props.color};
  border: ${props => props.selectedSize ? '2px solid rgb(90, 90, 90)' : '2px solid white'};
  border-radius: 3px;
  text-align: center;
  font-size: 12px;
  vertical-align: middle;

  :active {
    background-color: rgb(40, 40, 40);
  }

  :hover {
    border: ${props => props.selectedSize ? '2px solid green' : ''};
    // background-color: ${props => props.selectedSize ? 'rgb(237, 237, 237)' : ''};
  }

  :before {
    content: " ";
    position: absolute;
    z-index: -1;
    border: ${props => props.selectedSize ? '' : '0.5px solid rgb(90, 90, 90)'};
    border-radius: 3px;
    top: 1px;
    bottom: 1px;
    left: 1px;
    right: 1px;
  }
`;
