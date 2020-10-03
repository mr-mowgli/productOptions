import styled from 'styled-components';

export const ColorsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 0.05fr);
  margin: 20px 0;
  grid-row-gap: 0.75ch;
  grid-column-gap: 0.75ch;
`;

export const Color = styled.div`
  width: 35px;
  height: 35px;
  background-color: ${props => props.color};
  border: 0.5px solid rgb(54, 54, 54);
  border-radius: 2px;
  position: relative;
  margin: 3px;
`;

export const SizesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 0.05fr);
  grid-row-gap: 0.5ch;
  grid-column-gap: 0.5ch;
  margin-bottom: 20px;
`;

export const Size = styled.div`
  background-color: ${props => props.color};
  border: 0.5px solid rgb(54, 54, 54);
  border-radius: 3px;
  text-align: center;
  font-size: 12px;
  height: 25px;
  line-height: 25px;
  width: 50px;
  vertical-align: middle;
`;
