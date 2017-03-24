// @flow

import React, { Component } from 'react';
import { Text, TouchableHighlight, StatusBar, StyleSheet, View } from 'react-native';
import { Map } from 'immutable'
import NavigationBar from 'react-native-navbar';
import Login from './component/login';
import ArmyList from './component/ArmyList';
import sdk from './Sdk';
import colors from './colors';

// sdk.user.find(2)
//   .then(console.log)
//   .catch(console.error)
// ;
// global.XMLHttpRequest = global.originalXMLHttpRequest || global.XMLHttpRequest;


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
      <View style={styles.container}>
        <StatusBar hidden />

        <NavigationBar
          title={{title: this.state.title, tintColor: '#fff' }}
          tintColor={colors.secondary}
        />

        {!this.state.user ?
          <Login
            sdk={sdk}
            onLogged={this.handleLogged}
          /> :
          (<View>
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
          </View>)
        }
      </View>
    );
  }
}

function AppLoaded() {
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
