// @flow

import React, { Component } from 'react';
import { Text, TouchableHighlight, StatusBar, View } from 'react-native';
import { AndroidBackButton } from 'react-router-native';
import { Provider } from 'react-redux';
import { ConnectedRouter, push } from 'react-router-redux';
import { Map } from 'immutable';
import SideMenu from 'react-native-side-menu';
import createHistory from 'history/createMemoryHistory';
import styled from 'styled-components/native';
import Menu from './component/Menu';
import sdk from './Sdk';
import colors from './colors';
import { MainView, NavigationBarTitle } from './routes';
import configureStore from './configureStore';
import Layout from './component/Layout';

// global.XMLHttpRequest = global.originalXMLHttpRequest || global.XMLHttpRequest;
const history = createHistory();
const initialState = {};
const store = configureStore(initialState, history);

const Container = styled.View`
  flex: 1;
  background-color: ${colors.background};
`;

class App extends Component {
  state: {
    isMenuOpen: boolean,
  };

  constructor(props: {}) {
    super(props);

    (this: any).toggleMenu = this.toggleMenu.bind(this);

    this.state = {
      isMenuOpen: false,
    };
  }

  toggleMenu(isOpen: boolean) {
    this.setState({ isMenuOpen: isOpen });
  }

  render() {
    const { store } = this.props;

    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <AndroidBackButton>
            <Container>
              <StatusBar hidden />
              <SideMenu
                menu={<Menu />}
                isOpen={this.state.isMenuOpen}
                onChange={this.toggleMenu}
              >
                <Layout>
                  <NavigationBarTitle
                    onMenuPress={() => this.setState({ isMenuOpen: true })}
                  />
                  <MainView />
                </Layout>
              </SideMenu>
            </Container>
          </AndroidBackButton>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default () => <App store={store} />;
