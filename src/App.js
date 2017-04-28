// @flow

import React, { Component } from 'react';
import {
  BackAndroid,
  Button,
  Text,
  TouchableHighlight,
  StatusBar,
  View,
} from 'react-native';
import { connect, Provider } from 'react-redux';
import Army from './component/Army';
import ArmyList from './component/ArmyList';
import Login from './component/login';
import Logout from './component/login/Logout';
import Squad from './component/Squad';
import { Map } from 'immutable';
import styled from 'styled-components/native';
import {
  addNavigationHelpers,
  DrawerNavigator,
  NavigationActions,
  StackNavigator,
  TabNavigator,
  DrawerItems,
} from 'react-navigation';
import sdk from './Sdk';
import colors from './colors';
// import { MainView, NavigationBarTitle } from './routes';
import configureStore from './configureStore';
import Layout from './component/Layout';

// global.XMLHttpRequest = global.originalXMLHttpRequest || global.XMLHttpRequest;
const initialState = {};

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

const MainScreenNavigator = DrawerNavigator(
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
);

class App extends React.Component {
  componentDidMount() {
    this.sub = BackAndroid.addEventListener('backPress', () =>
      this.props.dispatch(NavigationActions.back())
    );
  }

  componentWillUnmount() {
    this.sub.remove();
  }

  render() {
    return (
      <MainScreenNavigator
        navigation={addNavigationHelpers({
          dispatch: this.props.dispatch,
          state: this.props.nav,
        })}
      />
    );
  }
}

const mapStateToProps = state => ({
  nav: state.nav,
});
const AppWithNavigationState = connect(mapStateToProps)(App);

const store = configureStore(initialState, MainScreenNavigator);
store.dispatch({ type: '@@ArmyCreator/INIT' });

class Root extends React.Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <Container style={{ paddingTop: StatusBar.currentHeight }}>
          <AppWithNavigationState />
        </Container>
      </Provider>
    );
  }
}

export default () => <Root store={store} />;
