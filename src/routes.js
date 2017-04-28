// @flow

import React, { Component } from 'react';
import styled from 'styled-components/native';
import {
  addNavigationHelpers,
  DrawerNavigator,
  NavigationActions,
  StackNavigator,
  TabNavigator,
  DrawerItems,
} from 'react-navigation';
import colors from './colors';
import Army from './component/Army';
import ArmyList from './component/ArmyList';
import Login from './component/login';
import Logout from './component/login/Logout';
import Squad from './component/Squad';

const Container = styled.View`
  flex: 1;
  background-color: ${colors.background};
`;

const DrawerHeaderContainer = styled.View`
  backgroundColor: ${colors.secondary};
  padding: 15;
`;

const DrawerHeader = styled.Text`
  color: ${colors.background};
  font-size: 18;
  font-weight: bold;
`;

const contentComponent = props => (
  <Container>
    <DrawerHeaderContainer>
      <DrawerHeader>Army Creator</DrawerHeader>
    </DrawerHeaderContainer>

    <DrawerItems {...props} />
  </Container>
);

const ArmyCreatorApp = {
  ArmyList: {
    screen: ArmyList,
    navigationOptions: { title: 'Mes armées' },
  },
  Army: {
    screen: Army,
    navigationOptions: ({ navigation }) => ({
      title: navigation.state.params.army.name,
    }),
  },
  Squad: {
    screen: Squad,
    navigationOptions: ({ navigation }) => ({
      title: navigation.state.params.squad.name,
    }),
  },
};

const AppNavigator = StackNavigator(ArmyCreatorApp, {
  initialRouteName: 'ArmyList',
  cardStyle: {
    backgroundColor: colors.background,
  },
  navigationOptions: {
    headerStyle: {
      backgroundColor: colors.secondary,
    },
    headerTitleStyle: {
      color: colors.background,
    },
  },
});

export default (MainScreenNavigator = DrawerNavigator(
  {
    ArmyList: {
      screen: AppNavigator,
      navigationOptions: { title: 'Mes armées' },
    },
    Login: { screen: Login, navigationOptions: { title: 'Connexion' } },
    Logout: { screen: Logout, navigationOptions: { title: 'Déconnexion' } },
  },
  {
    contentComponent,
    contentOptions: {
      activeTintColor: colors.secondary,
      inactiveTintColor: colors.softGray,
    },
    navigationOptions: {
      headerStyle: {
        backgroundColor: colors.secondary,
      },
      headerTitleStyle: {
        color: colors.background,
      },
    },
  }
));
