// @flow

import React, { Component } from 'react';
import { Text, TouchableHighlight, StatusBar, View } from 'react-native';
import { Redirect, Route, Link } from 'react-router-native';
import { composeWithDevTools } from 'remote-redux-devtools';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createMemoryHistory';
import { ConnectedRouter, routerMiddleware, push } from 'react-router-redux';

import { Map } from 'immutable'
import NavigationBar from 'react-native-navbar';
import SideMenu from 'react-native-side-menu';
import styled from 'styled-components/native';
import Menu from './component/Menu';
import sdk from './Sdk';
import colors from './colors';
import reducer from './reducer';
import Routes from './routes';

// global.XMLHttpRequest = global.originalXMLHttpRequest || global.XMLHttpRequest;
const history = createHistory();
const composeEnhancers = composeWithDevTools({
  // Specify here name, actionsBlacklist, actionsCreators and other options
});

const middlewares = [
  thunk,
  routerMiddleware(history)
];

const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(...middlewares)
  )
);

store.dispatch(push('/login'));

const Container = styled.View`
  flex: 1;
  background-color: ${colors.background};
`;

export default class App extends Component {
  state: {
    user: ?Map<any, any>,
    title: string,
    isMenuOpen: boolean,
    army: ?Map<any, any>,
  };


  constructor(props: {}) {
    super(props);

    // (this: any).handleLogged = this.handleLogged.bind(this);
    (this: any).handleLogout = this.handleLogout.bind(this);
    (this: any).toggleMenu = this.toggleMenu.bind(this);
    (this: any).handleArmySelection = this.handleArmySelection.bind(this);

    this.state = {
      user: null,
      title: 'Armycreator',
      isMenuOpen: false,
      army: null,
    };
  }

  // handleLogged() {
  //   sdk.user.findMe()
  //     .then((user) => {
  //       this.setState({
  //         user,
  //         title: 'Mes dernières listes',
  //         isMenuOpen: false,
  //       });
  //     })
  //     .then(store.dispatch(push('/armies/')))
  //     .catch(console.error)
  //   ;
  // }

  toggleMenu(isOpen) {
    this.setState({ isMenuOpen: isOpen });
  }

  handleArmySelection(army) {
    this.setState({ army, title: army.get('name') });
    store.dispatch(push('/armies/8'));
  }

  handleLogout() {
    this.setState({ title: 'Connexion', user: null, isMenuOpen: false });
    store.dispatch(push('/login'));
  }

  render() {
    const { army, title } = this.state;

    const menu = <Menu
      onLogout={this.handleLogout}
      onArmyList={() => null}
      user={this.state.user}
    />;


    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Container>
            <SideMenu
              menu={menu}
              isOpen={this.state.isMenuOpen}
              onChange={this.toggleMenu}
            >
              <StatusBar hidden />

              <NavigationBar
                title={{ title, tintColor: colors.white }}
                tintColor={colors.secondary}
                leftButton={{
                  title: '🍔',
                  handler: () => { this.setState({ isMenuOpen: true }); },
                }}
              />

              <Container>
                <Routes history={history} />
              </Container>
            </SideMenu>
          </Container>
        </ConnectedRouter>
      </Provider>
    );
  }
}
