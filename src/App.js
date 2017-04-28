// @flow

import React from 'react';
import { BackAndroid, StatusBar } from 'react-native';
import { connect, Provider } from 'react-redux';
import styled from 'styled-components/native';
import { addNavigationHelpers, NavigationActions } from 'react-navigation';
import colors from './colors';
import MainScreenNavigator from './routes';
import configureStore from './configureStore';

// global.XMLHttpRequest = global.originalXMLHttpRequest || global.XMLHttpRequest;
const store = configureStore(MainScreenNavigator);
store.dispatch({ type: '@@ArmyCreator/INIT' });

const Container = styled.View`
  flex: 1;
  background-color: ${colors.background};
  padding-top: ${StatusBar.currentHeight};
`;

class App extends React.Component {
  componentDidMount() {
    this.sub = BackAndroid.addEventListener('backPress', () =>
      this.props.dispatch(NavigationActions.back())
    );
  }

  componentWillUnmount() {
    this.sub.remove();
  }

  props: {
    dispatch: Function,
    nav: any,
  };

  sub: any;

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
  props: {
    store: store,
  };

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
