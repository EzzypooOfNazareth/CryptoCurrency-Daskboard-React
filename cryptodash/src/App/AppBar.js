import React from 'react';
import styled, {css} from 'styled-components';
import {AppContext} from './AppProvider';

const Logo = styled.div`
  font-size: 1.5em;
  font-weight: 700;
`

const Bar = styled.div`
  display: grid;
  grid-template-columns: 180px auto 100px 100px;
  margin-bottom: 30px;
`

const ControlButtonStyle = styled.div`
  cursor: pointer;
  ${props => props.active && css`
    color: #AFEEEE;
    text-shadow: 0px 0px 50px #F5F5F5;
  `}
  ${props => props.hidden && css `
    display: none;
  `}
`

function toProperCase(lower) {
  return lower.charAt(0).toUpperCase() + lower.substr(1);
}

function ControlButton({name}) {
  return (
    <AppContext.Consumer>
    {({firstVisit, page, setPage}) => (
      <ControlButtonStyle active={page === name} onClick={() => setPage(name)} hidden={firstVisit && name === 'dashboard'}>
        {toProperCase(name)}
      </ControlButtonStyle>)}
    </AppContext.Consumer>
  )
}

export default function() {
  return <Bar>
      <Logo> CryptoDash </Logo>
      <div/>
      <ControlButton name="dashboard"/>
      <ControlButton name="settings"/>
  </Bar>
}
