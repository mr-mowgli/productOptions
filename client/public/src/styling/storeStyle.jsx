import styled from 'styled-components';

export const StockLeft = styled.div`
  margin-top: 5px;
  color: rgb(184, 83, 0);
  font-size: 14px;
`

export const EditBtn = styled.div`
  font-size: 12px;
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
    border-color: rgb(204, 0, 0);
    border-width: 1px;
    border-style: solid;
    border-radius: 4px;
    margin-left: 5px;
    :hover {
      background-color: rgb(135, 0, 0);
      border-color: rgb(135, 0, 0);
    }
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

export const DeliveryNotEligible = styled.div`
  color: rgb(102, 102, 102);
  font-size: 14px;
  margin-top: 10px;
`;