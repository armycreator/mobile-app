import React from 'react';
import { TouchableHighlight } from 'react-native';
import styled from 'styled-components/native';
import colors from '../colors';

const BaseButton = styled.TouchableHighlight`
  border-width: 1;
  background-color: ${({ color }) => colors[color] || colors.softGray};
  padding-vertical: 20;
  padding-horizontal: 10;
  border-radius: 3;
  border-color: ${colors.softGray};
  margin-vertical: 5;
`;

function Button({ children, ...props }) {
  return (
    <BaseButton {...props}>
      {children}
    </BaseButton>
  );
}

export default Button;
