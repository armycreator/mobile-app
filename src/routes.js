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

type Route = { key: string, routeName: string };

class contentComponent extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      routes: [],
    };

    this.loggedRoutes = [
      { key: 'ArmyList', routeName: 'ArmyList' },
      // { key: 'Login', routeName: 'Login' },
      { key: 'Logout', routeName: 'Logout' },
    ];
    this.anonymousRoutes = [
      { key: 'ArmyList', routeName: 'ArmyList' },
      { key: 'Login', routeName: 'Login' },
    ];
  }

  state: { routes: Array<Route> };
  loggedRoutes: Array<Route>;
  anonymousRoutes: Array<Route>;

  componendDidMount() {
    console.log('mount');
    sdk.tokenStorage
      .hasAccessToken()
      .then(hasAccessToken => {
        if (!hasAccessToken) {
          throw new Error('No access token found');
        }
      })
      .then(() => this.setState({ routes: this.loggedRoutes }))
      .catch(() => this.setState({ routes: this.anonymousRoutes }));
  }

  render() {
    const { navigation, ...rest } = this.props;
    console.log(navigation);

    const newNavigation = navigation;
    newNavigation.state = Object.assign({}, navigation.state, {
      routes: this.state.routes,
    });
    console.log(newNavigation);

    return (
      <Container>
        <DrawerHeaderContainer>
          <DrawerHeader>Army Creator</DrawerHeader>
        </DrawerHeaderContainer>

        <DrawerItems navigation={newNavigation} {...rest} />
      </Container>
    );
  }
}

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
