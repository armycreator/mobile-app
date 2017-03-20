import React from 'react';
import { Text } from 'react-native';
import Login from './src/component/login';
import sdk from './src/Sdk';

// sdk.user.find(2)
//   .then(console.log)
//   .catch(console.error)
// ;

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
      <Text>Coucou</Text>
    );
  }
}
