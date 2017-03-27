// @flow

import React, { Component } from 'react';
import { Text, TouchableHighlight, StatusBar, View } from 'react-native';
import { Map } from 'immutable'
import NavigationBar from 'react-native-navbar';
import SideMenu from 'react-native-side-menu';
import styled from 'styled-components/native';
import Login from './component/login';
import ArmyList from './component/ArmyList';
import Menu from './component/Menu';
import sdk from './Sdk';
import colors from './colors';

// sdk.user.find(2)
//   .then(console.log)
//   .catch(console.error)
// ;
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
  };


  constructor(props: {}) {
    super(props);

    (this: any).handleLogged = this.handleLogged.bind(this);
    (this: any).toggleMenu = this.toggleMenu.bind(this);

    this.state = {
      user: null,
      title: 'Armycreator',
      isMenuOpen: false,
    };
  }

  handleLogged() {
    sdk.user.findMe()
      .then((user) => {
        this.setState({
          user,
        });
      })
      .catch(console.error)
    ;
  }

  toggleMenu(isOpen) {
    this.setState({ isMenuOpen: isOpen });
  }

  render() {
    const menu = <Menu
      onLogout={() => this.setState({ user: null, isMenuOpen: false })}
      user={this.state.user}
    />;

    return (
      <SideMenu
        menu={menu}
        isOpen={this.state.isMenuOpen}
        onChange={this.toggleMenu}
      >
        <StatusBar hidden />

        <NavigationBar
          title={{ title: this.state.title, tintColor: colors.white }}
          tintColor={colors.secondary}
          leftButton={{
            title: '🍔',
            handler: () => { this.setState({ isMenuOpen: true }); },
          }}
        />

        <Container>
          {!this.state.user ?
            <Login
              sdk={sdk}
              onLogged={this.handleLogged}
            /> :
            <ArmyList
              sdk={sdk}
              user={this.state.user}
            />
          }
        </Container>
      </SideMenu>
    );
  }
}
