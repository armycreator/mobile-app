import React from 'react';
import { Text, View } from 'react-native';
import { AndroidBackButton, Router, Route, Switch } from 'react-router-native';
import { ConnectedRouter } from 'react-router-redux';
import NavigationBar from 'react-native-navbar';
import styled from 'styled-components/native';
import HamburgerMenu from './component/HamburgerMenu';
import Layout from './component/Layout';
import ArmyList from './component/ArmyList';
import Army from './component/Army';
import Login from './component/login';
import colors from './colors';

const routes = [
  {
    path: '/armies/:id',
    exact: true,
    main: ({ location }) => <Army army={location.state.army} />,
    title: ({ location }) => {
      return <NavigationBarText>{location.state.army.get('name')}</NavigationBarText>;
    },
  },
  {
    path: '/armies/',
    exact: true,
    main: () => <ArmyList />,
    title: () => <NavigationBarText>Mes dernières listes</NavigationBarText>,
  },
  {
    main: () => <Login />,
    title: () => <NavigationBarText>Connexion</NavigationBarText>,
  },
];

const NavigationBarText = styled.Text`
  font-size: 17;
  letter-spacing: 0.5;
  color: ${colors.white};
`;

function NavigationBarTitle() {
  const title = <Switch>
    {routes.map((route, index) =>
      <Route
        key={index}
        path={route.path}
        exact={route.exact}
        component={route.title}
      />
    )}
  </Switch>;

  return (
    <NavigationBar
      title={title}
      tintColor={colors.secondary}
      leftButton={<HamburgerMenu
        onPress={() => this.setState({ isMenuOpen: true })}
      />}
    />
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${colors.background};
`;

export default function Routes({ history }) {
  return (<ConnectedRouter history={history}>
    <AndroidBackButton>
      <Layout>
        <Container>
          <NavigationBarTitle />

          <Switch>
            {routes.map((route, index) =>
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.main}
              />
            )}
          </Switch>
        </Container>
      </Layout>
    </AndroidBackButton>
  </ConnectedRouter>);
}
