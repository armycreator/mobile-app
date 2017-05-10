// @flow

// import React from 'react';
import { DrawerNavigator, StackNavigator } from 'react-navigation';
import colors from './colors';
import Army from './component/Army';
import { ProvidedArmyList, LastArmyList } from './component/ArmyList';
import Login from './component/login';
import Logout from './component/login/Logout';
import Squad from './component/Squad';
import DrawerMenu from './component/DrawerMenu';

const ArmyCreatorApp = {
  LastArmyList: {
    screen: LastArmyList,
    navigationOptions: {
      title: 'Mes armées',
    },
  },
  ProvidedArmyList: {
    screen: ProvidedArmyList,
    navigationOptions: ({ navigation }) => ({
      title: navigation.state.params.title,
    }),
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
  initialRouteName: 'LastArmyList',
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
    LastArmyList: {
      screen: AppNavigator,
      navigationOptions: { title: 'Mes dernières listes' },
    },
    ProvidedArmyList: {
      screen: AppNavigator,
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
