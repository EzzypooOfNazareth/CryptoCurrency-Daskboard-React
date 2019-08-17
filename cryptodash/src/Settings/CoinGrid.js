import React from 'react';
import styled from 'styled-components';
import {AppContext} from '../App/AppProvider';
import CoinTile from './CoinTile';

export const CoinGridStyle = styled.div`
  display: grid;
  grid-template-columns: repeat( auto-fill, minmax(130px, 1fr) );
  grid-gap: 15px;
  margin-top: 25px;
`

function getLowerSection(coinList, filteredCoins) {
  return (filteredCoins && Object.keys(filteredCoins)) ||
    Object.keys(coinList).slice(0, 100);
}

function getCoinDisplay(coinList, topSection, favorites, filteredCoins) {
  return topSection ? favorites : getLowerSection(coinList, filteredCoins);
}

export default function({topSection}) {
  return (<AppContext.Consumer>
    {({coinList, favorites, filteredCoins}) => <CoinGridStyle>
        {getCoinDisplay(coinList, topSection, favorites, filteredCoins).map(coinKey => <CoinTile key={coinKey} topSection={topSection} coinKey={coinKey}/>)}
    </CoinGridStyle>}
  </AppContext.Consumer>
  );
}
