// @flow

import React, { Component } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import menuImage from '../images/hamburger-menu.png';

const HamburgerMenuContainer = styled.View`
  flex: 1;
  justify-content: center;
  margin-horizontal: 10;
`;

const HamburgerMenuImage = styled.Image`
  width: 30;
  height: 30;
`;

type HamburgerMenuType = {
  onPress: Function,
};

export default function HamburgerMenu({ onPress }: HamburgerMenuType) {
  return (
    <TouchableOpacity onPress={onPress}>
      <HamburgerMenuContainer>
        <HamburgerMenuImage source={menuImage} />
      </HamburgerMenuContainer>
    </TouchableOpacity>
  );
}
