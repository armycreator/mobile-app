// @flow

// import React from 'react';
import { DrawerNavigator, StackNavigator } from 'react-navigation';
import colors from './colors';
import Army from './component/Army';
import ArmyList from './component/ArmyList';
import Login from './component/login';
import Logout from './component/login/Logout';
import Squad from './component/Squad';
import DrawerMenu from './component/DrawerMenu';

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

export default DrawerNavigator(
  {
    ArmyList: {
      screen: AppNavigator,
      navigationOptions: { title: 'Mes dernières listes' },
    },
    Login: { screen: Login, navigationOptions: { title: 'Connexion' } },
    Logout: { screen: Logout, navigationOptions: { title: 'Déconnexion' } },
  },
  {
    contentComponent: DrawerMenu,
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
);
