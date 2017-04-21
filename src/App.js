// @flow

import React, { Component } from 'react';
import { Text, TouchableHighlight, StatusBar, View } from 'react-native';
import { AndroidBackButton } from 'react-router-native';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Map } from 'immutable';
import SideMenu from './component/SideMenu';
import createHistory from 'history/createMemoryHistory';
import styled from 'styled-components/native';
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
  render() {
    const { store, history } = this.props;

    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <AndroidBackButton>
            <Container>
              <StatusBar hidden />
              <SideMenu>
                <Layout>
                  <NavigationBarTitle
                    onMenuPress={() => {
                      store.dispatch({ type: 'TOGGLE_MENU', isOpen: true });
                    }}
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

export default () => <App store={store} history={history} />;
