// @flow

import React, { Component } from 'react';
import { Text, TouchableHighlight, StatusBar, View } from 'react-native';
import { NativeRouter, Redirect, Route, Link } from 'react-router-native';
import { Map } from 'immutable'
import NavigationBar from 'react-native-navbar';
import SideMenu from 'react-native-side-menu';
import styled from 'styled-components/native';
import Login from './component/login';
import ArmyList from './component/ArmyList';
import Army from './component/Army';
import Menu from './component/Menu';
import sdk from './Sdk';
import colors from './colors';

// global.XMLHttpRequest = global.originalXMLHttpRequest || global.XMLHttpRequest;

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

    (this: any).handleLogged = this.handleLogged.bind(this);
    (this: any).toggleMenu = this.toggleMenu.bind(this);
    (this: any).handleArmySelection = this.handleArmySelection.bind(this);

    this.state = {
      user: null,
      title: 'Armycreator',
      isMenuOpen: false,
      army: null,
    };
  }

  handleLogged() {
    sdk.user.findMe()
      .then((user) => {
        this.setState({
          user,
          title: 'Mes dernières listes',
        });
      })
      .catch(console.error)
    ;
  }

  toggleMenu(isOpen) {
    this.setState({ isMenuOpen: isOpen });
  }

  handleArmySelection(army) {
    this.setState({ army, title: army.get('name') });
  }

  render() {
    const { army, title } = this.state;

    const menu = <Menu
      onLogout={() => this.setState({ title: 'Connexion', user: null, isMenuOpen: false })}
      onArmyList={() => this.setState({ title: 'Mes dernières listes', army: null, isMenuOpen: false })}
      user={this.state.user}
    />;


    return (
      <NativeRouter>
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
              {!this.state.user &&
                <Redirect to={{
                  pathname: '/login',
                }} />
              }

              <Route
                exact
                path="/login"
                component={({ location }) => {
                  if (this.state.user) {
                    return <Redirect to={{ pathname: '/armies/' }} />;
                  }

                  return <Login
                    sdk={sdk}
                    onLogged={this.handleLogged}
                  />
                }}
              />
              {this.state.user &&
                <View>
                  <Route
                    exact
                    path="/armies/"
                    component={({ location }) => {
                      if (this.state.army) {
                        return <Redirect to={{ pathname: '/armies/8' }} />
                      }

                      return <ArmyList
                        sdk={sdk}
                        user={this.state.user}
                        onSelectArmy={this.handleArmySelection}
                      />;
                    }}
                  />
                  <Route
                    exact
                    path="/armies/:id"
                    component={({ location }) => {
                      if (!this.state.army) {
                        return <Redirect to={{ pathname: '/armies/' }} />
                      }
                      return <Army army={army} sdk={sdk} />;
                    }}
                  />
                </View>
              }
            </Container>
          </SideMenu>
        </Container>
      </NativeRouter>
    );
  }
}
