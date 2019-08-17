import React from 'react';
import {AppContext} from '../App/AppProvider';
import styled from 'styled-components';

const WelcomeMessageStyle = styled.div`
  font-size: 1.75em;
  font-weight: 700;
`

export default function({firstVisit}) {
  return (
    <AppContext.Consumer>
      {({firstVisit}) =>
        firstVisit ? <WelcomeMessageStyle>
          Welcome, Select your desired currencies. {' '}
        </WelcomeMessageStyle> : null
      }
    </AppContext.Consumer>
  );
};
