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

const contentComponent = props => (
  <Container>
    <DrawerItems {...props} />
  </Container>
);

const MainScreenNavigator = DrawerNavigator(
  {
    Login: { screen: Login },
    ArmyList: { screen: ArmyList },
    Logout: { screen: Logout },
  },
  {
    contentComponent,
  }
);

MainScreenNavigator.navigationOptions = {
  title: 'Army Creator',
  headerStyle: {
    backgroundColor: colors.secondary,
  },
  headerTitleStyle: {
    color: colors.white,
  },
};

const ArmyCreatorApp = {
  ArmyList: { screen: MainScreenNavigator },
  Army: { screen: Army },
  Squad: { screen: Squad },
};

const AppNavigator = StackNavigator(ArmyCreatorApp, {
  initialRouteName: 'ArmyList',
  cardStyle: {
    backgroundColor: colors.background,
  },
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
        <Container style={{ paddingTop: StatusBar.currentHeight }}>
          <AppWithNavigationState />
        </Container>
      </Provider>
    );
  }
}

export default () => <Root store={store} />;
