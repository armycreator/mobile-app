// @flow
import React from 'react';
import { View, TouchableHighlight, Text } from 'react-native';
import styled from 'styled-components/native';
import NavigationBar from 'react-native-navbar';
import colors from '../colors';

const MenuContainer = styled.View`
  background-color: ${colors.lightBackground};
  flex: 1;
  border-right-width: 1;
  border-right-color: ${colors.black};
`;

function Menu({ user, onLogout, onArmyList }) {
  return (<MenuContainer>
    <NavigationBar
      title={{ title: 'Menu', tintColor: colors.white }}
      tintColor={colors.secondary}
    />

    {user &&
      <MenuContainer>
        <TouchableHighlight
          onPress={onArmyList}
          style={{ padding: 30, marginTop: 30 }}
        >
          <Text>Mes listes</Text>
        </TouchableHighlight>


        <TouchableHighlight
          onPress={onLogout}
          style={{ backgroundColor: 'red', padding: 30, marginTop: 30 }}
        >
          <Text>Logout</Text>
        </TouchableHighlight>
      </MenuContainer>
    }
  </MenuContainer>);
};

export default Menu;
