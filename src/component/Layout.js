import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import colors from '../colors';

const Container = styled.View`
  flex: 1;
  background-color: ${colors.background};
`;

export default function Layout({ children }) {
  return <Container>{children}</Container>;
}
