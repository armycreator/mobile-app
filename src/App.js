import React from 'react';
import { Text, TouchableHighlight, View } from 'react-native';
import Login from './component/login';
import sdk from './Sdk';

// sdk.user.find(2)
//   .then(console.log)
//   .catch(console.error)
// ;
// global.XMLHttpRequest = global.originalXMLHttpRequest || global.XMLHttpRequest;

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogged: false,
    };
  }

  render() {
    if (!this.state.isLogged) {
      return (
        <Login
          sdk={sdk}
          onLogged={() => this.setState({ isLogged: true })}
        />
      );
    }

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TouchableHighlight onPress={() => this.setState({ isLogged: false })} style={{ backgroundColor: '#aaaaaa' }}>
          <Text>Coucou</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
