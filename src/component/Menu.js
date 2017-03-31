// @flow
import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import styled from 'styled-components/native';
import NavigationBar from 'react-native-navbar';
import colors from '../colors';
import Button from './Button';

const MenuContainer = styled.View`
  flex: 1;
  background-color: ${colors.lightBackground};
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
      <View>
        <TouchableOpacity
          onPress={onArmyList}
          style={{ padding: 15, borderBottomWidth: 1 }}
        >
          <Text style={{ color: colors.white }}>Mes listes</Text>
        </TouchableOpacity>


        <View style={{ paddingHorizontal: 10 }}>
          <Button
            color="danger"
            onPress={onLogout}
          >
            <Text style={{ color: colors.white, textAlign: 'center' }}>
              Déconnexion
            </Text>
          </Button>
        </View>
      </View>
    }
  </MenuContainer>);
};

export default Menu;
