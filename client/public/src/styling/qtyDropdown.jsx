import styled from 'styled-components';

export const SelectQtyContainer = styled.div`
  width: 77px;
  position: relative;
  margin-top: 15px;
  margin-bottom: 10px;
  cursor: pointer;
`;

export const SelectQtyTitle = styled.div`
  position: absolute;
  display:inline;
  left: 12px;
  top: -8px;
  z-index: 1;
  background-color: white;
  border: 1.5px solid white;
  font-weight: bold;
  font-size: 12.5px;
  pointer-events: none;
`;

export const QtyBtn = styled.div`
  height: 35px;
  border: 1px solid  rgb(116,116,116);
  border-radius: 3px;
  vertical-align: center;
  :hover { background-color: rgb(237, 237, 237) }
  :focus { background-color: rgb(237, 237, 237) }
  :active {
    background-color: rgb(70, 70, 70);
    color: rgb(254, 254, 254);
  }

`;

export const BtnText = styled.span`
  position: relative;
  top: 8px;
  left: 12px;
  font-size: 14px;
`;

export const DropdownArrow = styled.span`
  position: relative;
  top: 4px;
  left: 40px;
  font-weight: lighter;
`;

export const QtyDropdownContent = styled.div`
  display: ${props => props.active ? 'show' : 'none'};
  position: absolute;
  top: 40px;
  background-color: #ffffff;
  min-width: 160px;
  border: 1px solid black;
  border-radius: 4px;
  padding-left 20px;
  z-index: 1;
  padding: 0 16px;

`;

export const DropdownNumber = styled.div`
  border-bottom: 1px solid black:
  color: black;
  padding: 12px 0;
  text-decoration: none;
  border-bottom: 1px solid black;
  display: block;
  :hover {
    background-color: #ddd;
  }
`;
