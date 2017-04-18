import React from 'react';
import { Text } from 'react-native';
import { Route, Switch } from 'react-router-native';
import NavigationBar from 'react-native-navbar';
import styled from 'styled-components/native';
import HamburgerMenu from './component/HamburgerMenu';
import ArmyList from './component/ArmyList';
import Army from './component/Army';
import Squad from './component/Squad';
import Login from './component/login';
import Debug from './component/Debug';
import colors from './colors';

const routes = [
  {
    path: '/squad/:id',
    exact: true,
    main: ({ location }) => <Squad squad={location.state.squad} />,
    title: ({ location }) => {
      return <NavigationBarText>{location.state.squad.name}</NavigationBarText>;
    },
  },
  {
    path: '/armies/:id',
    exact: true,
    main: ({ location }) => <Army army={location.state.army} />,
    title: ({ location }) => {
      return <NavigationBarText>{location.state.army.name}</NavigationBarText>;
    },
  },
  {
    path: '/armies/',
    exact: true,
    main: () => <ArmyList />,
    title: () => <NavigationBarText>Mes dernières listes</NavigationBarText>,
  },
  {
    path: '/debug/:id',
    main: ({ location, match, id }) => <Debug id={match.params.id} />,
    title: () => <NavigationBarText>Debug</NavigationBarText>,
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
export function NavigationBarTitle({ onMenuPress }) {
  const title = (
    <Switch>
      {routes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          component={route.title}
        />
      ))}
    </Switch>
  );
  return (
    <NavigationBar
      title={title}
      tintColor={colors.secondary}
      leftButton={<HamburgerMenu onPress={onMenuPress} />}
    />
  );
}
export function MainView() {
  return (
    <Switch>
      {routes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          component={route.main}
        />
      ))}
    </Switch>
  );
}
