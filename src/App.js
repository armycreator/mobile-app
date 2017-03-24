import React from 'react';
import { Text, TouchableHighlight, View } from 'react-native';
import Login from './component/login';
import sdk from './Sdk';

// sdk.user.find(2)
//   .then(console.log)
//   .catch(console.error)
// ;
// global.XMLHttpRequest = global.originalXMLHttpRequest || global.XMLHttpRequest;

function Coucou({ onPress, user }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableHighlight
        onPress={onPress}
        style={{ backgroundColor: '#aaaaaa' }}
      >
        <Text>Coucou {user.get('username')}</Text>
      </TouchableHighlight>
    </View>
  );
}

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.handleLogged = this.handleLogged.bind(this);

    this.state = {
      isLogged: false,
      user: null,
    };
  }

  handleLogged() {
    sdk.user.findMe()
      .then((user) => {
        this.setState({
          isLogged: true,
          user,
        });
      })
      .catch(console.error)
    ;
  }

  render() {
    if (!this.state.isLogged) {
      return (
        <Login
          sdk={sdk}
          onLogged={this.handleLogged}
        />
      );
    }

    return (
      <Coucou
        onPress={() => this.setState({ isLogged: false })}
        user={this.state.user}
      />
    );
  }
}
