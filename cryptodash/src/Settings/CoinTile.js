import React from 'react';
import {AppContext} from '../App/AppProvider';
import {SelectTile, DeleteTile, DisableTile} from '../Shared/SharedTile';
import CoinHeader from './CoinHeader';
import CoinImage from '../Shared/CoinImage';

function clickCoinHandler(topSection, coinKey, addCoin, removeCoin) {
  return topSection ? () => {
    removeCoin(coinKey)
  } : () => {
    addCoin(coinKey)
  }
}

export default function({coinKey, topSection}) {
  return <AppContext.Consumer>
    {({coinList, addCoin, removeCoin, existsFavorites}) => {
      let coin = coinList[coinKey];
      let TileClass = SelectTile;

      if(topSection) {
        TileClass = DeleteTile;
      }else if(existsFavorites(coinKey)) {
        TileClass = DisableTile;
      }

      return <TileClass onClick={clickCoinHandler(topSection, coinKey, addCoin, removeCoin)}>
        <CoinHeader topSection={topSection} name={coin.CoinName} symbol={coin.Symbol}/>
        <CoinImage coin={coin}/>
      </TileClass>
    }}
  </AppContext.Consumer>
}
