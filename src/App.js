// @flow

import React, { Component } from 'react';
import { Text, TouchableHighlight, StatusBar, View } from 'react-native';
import { Map } from 'immutable'
import NavigationBar from 'react-native-navbar';
import styled from 'styled-components/native';
import Login from './component/login';
import ArmyList from './component/ArmyList';
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
  };


  constructor(props: {}) {
    super(props);

    (this: any).handleLogged = this.handleLogged.bind(this);

    this.state = {
      user: null,
      title: 'Armycreator',
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

  render() {
    return (
      <Container>
        <StatusBar hidden />

        <NavigationBar
          title={{title: this.state.title, tintColor: colors.white }}
          tintColor={colors.secondary}
        />

        {!this.state.user ?
          <Login
            sdk={sdk}
            onLogged={this.handleLogged}
          /> :
          (<Container>
            <ArmyList
              sdk={sdk}
              user={this.state.user}
            />
            <TouchableHighlight
              onPress={() => this.setState({ user: null })}
              style={{ backgroundColor: 'red', padding: 30, marginTop: 30 }}
            >
              <Text>Logout</Text>
            </TouchableHighlight>
          </Container>)
        }
      </Container>
    );
  }
}
