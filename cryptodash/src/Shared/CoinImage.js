import React from 'react';
import styled, {css} from 'styled-components';

const CoinImageStyle = styled.img`
  height: 50px;
  ${props => props.spotLight && css`
    height: 200px;
    margin: auto;
    display: block;
  `}
`

export default function({coin, spotLight}) {
  return <CoinImageStyle
    spotLight={spotLight}
    alt={coin.CoinSymbol}
    src={`http://cryptocompare.com/${coin.ImageUrl}`}
  />;
}
