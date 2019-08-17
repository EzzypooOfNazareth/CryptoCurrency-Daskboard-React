import React from 'react';
import styled from 'styled-components';
import {DeleteTile} from '../Shared/SharedTile';

export const CoinHeaderStyle = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

export const CoinSymbol = styled.div`
  justify-self: right;
`;

export const DeleteIcon = styled.div`
  justify-self: right;
  display: none;
  ${DeleteTile}:hover & {
    display: block;
    color: red;
  }
`;

export default function({name, symbol, topSection}) {
  return <CoinHeaderStyle>
    <div>{name}</div>
    {topSection ? (
      <DeleteIcon> X </DeleteIcon>
    ) : (<CoinSymbol>{symbol}</CoinSymbol>
  )}
  </CoinHeaderStyle>
}
