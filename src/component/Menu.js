// @flow
import React from 'react';
import { View, TouchableHighlight, Text } from 'react-native';
import NavigationBar from 'react-native-navbar';
import colors from '../colors';

function Menu({ onLogout }) {
  return (<View>
    <NavigationBar
      title={{ title: 'Menu', tintColor: colors.white }}
      tintColor={colors.secondary}
    />

    <TouchableHighlight
      onPress={onLogout}
      style={{ backgroundColor: 'red', padding: 30, marginTop: 30 }}
    >
      <Text>Logout</Text>
    </TouchableHighlight>
  </View>);
};

export default Menu;
