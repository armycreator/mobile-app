// @flow

import React, { Component } from 'react';
import { Text, TouchableHighlight, StatusBar, View } from 'react-native';
import { Provider } from 'react-redux';
import { ConnectedRouter, push } from 'react-router-redux';
import { Map } from 'immutable'
import SideMenu from 'react-native-side-menu';
import createHistory from 'history/createMemoryHistory';
import styled from 'styled-components/native';
import Menu from './component/Menu';
import sdk from './Sdk';
import colors from './colors';
import Routes from './routes';
import configureStore from './configureStore';

// global.XMLHttpRequest = global.originalXMLHttpRequest || global.XMLHttpRequest;
const history = createHistory();
const store = configureStore(history);

const Container = styled.View`
  flex: 1;
  background-color: ${colors.background};
`;

export default class App extends Component {
  state: {
    title: string,
    isMenuOpen: boolean,
  };


  constructor(props: {}) {
    super(props);

    (this: any).handleLogout = this.handleLogout.bind(this);
    (this: any).toggleMenu = this.toggleMenu.bind(this);

    this.state = {
      title: 'Armycreator',
      isMenuOpen: false,
    };
  }

  toggleMenu(isOpen) {
    this.setState({ isMenuOpen: isOpen });
  }

  handleLogout() {
    this.setState({ isMenuOpen: false });
    store.dispatch(push('/login'));
  }

  render() {
    const { title } = this.state;

    const menu = <Menu
      onLogout={this.handleLogout}
      onArmyList={() => null}
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

              <Routes history={history} />
            </SideMenu>
          </Container>
        </ConnectedRouter>
      </Provider>
    );
  }
}
