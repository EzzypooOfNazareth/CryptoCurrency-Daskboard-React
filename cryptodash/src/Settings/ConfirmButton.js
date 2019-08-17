import React from 'react';
import styled from 'styled-components';
import {AppContext} from '../App/AppProvider';
import {fontSize1, greenBoxShadow, color3} from '../Shared/SharedStyles';

const ConfirmButtonStyle = styled.div`
  margin: 20px;
  color: ${color3};
  cursor: pointer;
  ${fontSize1}
  padding: 5px;
  cursor: pointer;
  font-weight: 500;
    &:hover {
      ${greenBoxShadow}
    }
`

export const CenterDiv = styled.div`
  display: grid;
  justify-content: center;
`

export default function() {
  return (
    <AppContext.Consumer>
      {({confirmFavorites}) =>
        <CenterDiv>
          <ConfirmButtonStyle onClick={confirmFavorites}>Confirm</ConfirmButtonStyle>
        </CenterDiv>
        }
    </AppContext.Consumer>
  )
}
