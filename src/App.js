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
import MainScreenNavigator from './routes';
import configureStore from './configureStore';
import Layout from './component/Layout';

// global.XMLHttpRequest = global.originalXMLHttpRequest || global.XMLHttpRequest;
const store = configureStore(MainScreenNavigator);
store.dispatch({ type: '@@ArmyCreator/INIT' });

const Container = styled.View`
  flex: 1;
  background-color: ${colors.background};
  padding-top: ${StatusBar.currentHeight};
`;

class App extends React.Component {
  sub: any;

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

class Root extends React.Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <Container>
          <AppWithNavigationState />
        </Container>
      </Provider>
    );
  }
}

export default () => <Root store={store} />;
