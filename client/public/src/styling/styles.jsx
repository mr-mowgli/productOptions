import styled, { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  body {
    font-family: Arial, sans-serif;
    color: rgb(54, 54, 54);
  }
`;

export const Price = styled.h2`
  font-weight: bold;
  margin: 10px 0;
`;

export const CenterTextBox = styled.div`
  text-align: center;
`;
