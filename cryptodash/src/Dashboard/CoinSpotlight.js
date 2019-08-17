import React from 'react';
import {AppContext} from '../App/AppProvider';
import {Tile} from '../Shared/SharedTile';
import CoinImage from '../Shared/CoinImage';
import styled from 'styled-components';

const SpotLightName = styled.h2`
    text-align: center;
`

export default function() {
    return (
        <AppContext.Consumer>
            {({currentFavorite, coinList}) => 
                <Tile>
                    <SpotLightName>Favorite: {coinList[currentFavorite].CoinName}</SpotLightName>
                    <CoinImage spotLight coin={coinList[currentFavorite]}/>
                </Tile>
            }
        </AppContext.Consumer>
    )
}