import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
`;

export default function Layout({ children }) {
  return <Container>{children}</Container>;
}
