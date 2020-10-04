import styled from 'styled-components';

export const SelectedOption = styled.div`
  font-size: 19px;
  margin-top: 15px;
  margin-bottom: 5px;
  span {
    font-weight: bold;
  }
`;

export const ColorsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 0.04fr);
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
  grid-template-columns: repeat(4, 0.23fr);
  grid-row-gap: 1.5ch;
  // grid-column-gap: 0.5ch;
`;

export const SizeHighlight = styled.div`

  border-radius: 2px;
  width: 50px;
  height: 25px;
  line-height: 25px;
`;

export const Size = styled.div`
  position: relative;
  width: 63px;
  height: 28px;
  cursor: pointer;
  background-color: ${props => props.color};
  border: ${props => props.selectedSize ? '2px solid rgb(90, 90, 90)' : '2px solid white'};
  border-radius: 3px;
  text-align: center;
  font-size: 12px;
  vertical-align: middle;
  padding-top: 4px;

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
