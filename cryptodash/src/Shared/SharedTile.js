import styled from 'styled-components';
import {subtleBoxShadow, lightBlueBackground, greenBoxShadow, redBoxShadow} from './SharedStyles';

export const Tile = styled.div`
  ${subtleBoxShadow}
  ${lightBlueBackground}
  padding: 10px;
`

export const SelectTile = styled(Tile)`
  &:hover {
    cursor: pointer;
    ${greenBoxShadow}
  }
`

export const DeleteTile = styled(SelectTile)`
  &:hover {
    cursor: pointer;
    ${redBoxShadow}
  }
`;

export const DisableTile = styled(Tile)`
  pointer-events: none;
  opacity: 0.4;
`;
