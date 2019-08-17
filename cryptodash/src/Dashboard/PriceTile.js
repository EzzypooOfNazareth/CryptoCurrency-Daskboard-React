import React from 'react';
import styled, {css} from 'styled-components';
import {SelectTile} from '../Shared/SharedTile';
import {fontSize3, fontSizeBig, greenBoxShadow} from '../Shared/SharedStyles';
import {CoinHeaderStyle} from '../Settings/CoinHeader';
import {AppContext} from '../App/AppProvider';

const JustifyRight = styled.div`
    justify-self: right;
`

const JustifyLeft = styled.div`
    justify-self: left;
`

const TickerPrice = styled.div`
    ${fontSizeBig}
    font-weight: 700;
`

const ChangePct = styled.div`
    color: green;
    font-weight: 500;
    font-style: italic;
    ${props => props.red && css`
        color: red;
    `}
`

const numberFormat = number => {
    return +(number + '').slice(0, 7);
}

const PriceTileStyle = styled(SelectTile)`
    ${props => props.compact && css`
        display: grid;
        ${fontSize3}
        grid-gap: 15px;
        grid-template-columns: repeat(3, 1fr);
    `}

    ${props => props.currentFavorite && css`
        ${greenBoxShadow}
        pointer-events: none;
    `}
`

function ChangePercent ({data}) {
    return (
        <JustifyRight>
            <ChangePct red={data.CHANGEPCT24HOUR < 0}>
                {numberFormat(data.CHANGEPCT24HOUR)}%
            </ChangePct>
        </JustifyRight>
    );
}

function PriceTile({sym, data, currentFavorite, setCurrentFav}) {
    return (
        <PriceTileStyle onClick={setCurrentFav} currentFavorite={currentFavorite}>
            <CoinHeaderStyle>
                <div>{sym}</div>
                <ChangePercent data={data}/>
            </CoinHeaderStyle>
            <TickerPrice>
                ${numberFormat(data.PRICE)}
            </TickerPrice>
        </PriceTileStyle>
    );
}

function PriceTileCompact({sym, data, currentFavorite, setCurrentFav}) {
    return (
        <PriceTileStyle onClick={setCurrentFav} compact currentFavorite={currentFavorite}>
            <JustifyLeft>{sym}</JustifyLeft>
            <ChangePercent data={data}/>
            <JustifyRight>
                ${numberFormat(data.PRICE)}
            </JustifyRight>
        </PriceTileStyle>
    );
}

export default function({price, index}) {
    let sym = Object.keys(price)[0];
    let data = price[sym]['USD'];
    let TileClass = index < 5 ? PriceTile: PriceTileCompact;

    return (
        <AppContext.Consumer>
            {({currentFavorite, setCurrentFav}) => 
            <TileClass 
                sym={sym}
                data={data}
                currentFavorite={currentFavorite === sym}
                setCurrentFav={() => setCurrentFav(sym)}>
            </TileClass>
            }
        </AppContext.Consumer>
    );
}