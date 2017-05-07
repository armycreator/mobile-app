// @flow

import React from 'react';
import styled from 'styled-components/native';
import { DrawerNavigator, StackNavigator, DrawerItems } from 'react-navigation';
import colors from './colors';
import Army from './component/Army';
import ArmyList from './component/ArmyList';
import Login from './component/login';
import Logout from './component/login/Logout';
import Squad from './component/Squad';
import sdk from './Sdk';

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

const contentComponent = ({
  navigation,
  ...rest
}: {
  navigation: any,
  rest: any,
}) => {
  console.log(navigation);

  const anonymousNavigation = navigation;
  const loggedNavigation = navigation;
  anonymousNavigation.state = Object.assign({}, navigation.state, {
    routes: [
      { key: 'ArmyList', routeName: 'ArmyList' },
      // { key: 'Login', routeName: 'Login' },
      { key: 'Logout', routeName: 'Logout' },
    ],
  });
  loggedNavigation.state = Object.assign({}, navigation.state, {
    routes: [
      { key: 'ArmyList', routeName: 'ArmyList' },
      { key: 'Login', routeName: 'Login' },
    ],
  });

  return sdk.tokenStorage
    .hasAccessToken()
    .then(hasAccessToken => {
      if (!hasAccessToken) {
        throw new Error('No access token found');
      }
    })
    .then(() => (
        <Container>
          <DrawerHeaderContainer>
            <DrawerHeader>Army Creator</DrawerHeader>
          </DrawerHeaderContainer>

          <DrawerItems navigation={loggedNavigation} {...rest} />
        </Container>
      ))
    .catch(() => (
        <Container>
          <DrawerHeaderContainer>
            <DrawerHeader>Army Creator</DrawerHeader>
          </DrawerHeaderContainer>

          <DrawerItems navigation={anonymousNavigation} {...rest} />
        </Container>
      ));
};

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
      navigationOptions: { title: 'Mes armées' },
    },
    Test: { screen: () => null, navigationOptions: { title: 'Test' } },
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
);
