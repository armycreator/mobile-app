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

const MainScreenNavigator = DrawerNavigator({
  ArmyList: { screen: ArmyList },
  Login: { screen: Login },
  Logout: { screen: Logout },
});
MainScreenNavigator.navigationOptions = {
  title: 'Army Creator',
};

const ArmyCreatorApp = {
  ArmyList: { screen: MainScreenNavigator },
  Army: { screen: Army },
  Squad: { screen: Squad },
};

const AppNavigator = StackNavigator(ArmyCreatorApp, {
  initialRouteName: 'ArmyList',
});

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
      <AppNavigator
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

const store = configureStore(initialState, AppNavigator);
store.dispatch({ type: '@@ArmyCreator/INIT' });

class Root extends React.Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}

export default () => <Root store={store} />;
