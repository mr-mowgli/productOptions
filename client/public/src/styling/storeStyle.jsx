import styled from 'styled-components';

export const StockLeft = styled.div`
  margin-top: 5px;
  color: rgb(184, 83, 0);
  font-size: 12px;
`

export const EditStoreBtn = styled.div`
  font-size: 10px;
  text-decoration: underline;
  cursor: pointer;
`

export const PickupBtnDiv = styled.div`
  flex-basis: 42%;
  max-width: 42%;
  margin-left: 5px;
  button {
    width: 100%;
    height: 32px;
    font-size: 13px;
    margin-bottom: 8px;
    padding-left: 4px;
    cursor: pointer;
    color: rgb(255, 255, 255);
    background-color: rgb(204, 0, 0);
    border-width: 1px;
    border-style: solid;
    border-color: rgb(204, 0, 0);
    border-radius: 4px;
    text-decoration: underline;
    margin-left: 5px;
  }
`

export const Pickuptext = styled.span`
  color: ${({qty}) => qty > 0 ? 'rgb(0, 102, 1)' : 'rgb(51, 51, 51)'};
  font-weight: ${({qty}) => qty > 0 ? 'bold' : 'normal'};
`

export const StoreLocationStyle= styled.span`
  font-weight: bold;
  text-decoration: underline;
`