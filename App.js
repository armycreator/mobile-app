import React from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';
import sdk from './src/Sdk';

// sdk.user.find(2)
//   .then(console.log)
//   .catch(console.error)
// ;

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.handleLogin = this.handleLogin.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);

    this.state = {
      username: null,
      password: null,
    };
  }

  handleLogin(event) {
    event.preventDefault();

    console.log(this.state);

    sdk.tokenStorage.generateToken(this.state)
      .then(console.log)
      .catch(console.error)
    ;
  }

  handleUsernameChange(event) {
    this.setState({
      username: event.nativeEvent.text,
    });
  }

  handlePasswordChange(event) {
    this.setState({
      password: event.nativeEvent.text,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Connection</Text>
        </View>
        <KeyboardAvoidingView behavior="padding" style={styles.content}>
          <View style={styles.loginForm}>
            <Text style={styles.label}>Utilisateur</Text>
            <TextInput
              autoCapitalize="none"
              style={styles.input}
              onChange={this.handleUsernameChange}
            />
            <Text style={styles.label}>Mot de passe</Text>
            <TextInput
              autoCapitalize="none"
              textDecorationLine="none"
              style={styles.input}
              secureTextEntry
              onChange={this.handlePasswordChange}
            />

            <TouchableHighlight style={styles.primaryButton} onPress={this.handleLogin}>
              <Text style={styles.primaryButtonText}>Valider</Text>
            </TouchableHighlight>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2e2f2a',
  },

  header: {
    backgroundColor: '#eb9e34',
  },

  headerText: {
    color: '#ffffff',
  },

  content: {
    flex: 1,
    justifyContent: 'center',
  },

  loginForm: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#ffffff',
  },

  primaryButton: {
    backgroundColor: '#457F78',
    paddingVertical: 20,
  },

  primaryButtonText: {
    color: '#ffffff',
    textAlign: 'center',
  },

  label: {
    height: 30,
    textAlignVertical: 'bottom',
  },
  input: {
    height: 40,
    // textAlignVertical: 'top',
    // borderColor: 'gray',
    // borderWidth: 1,
  },
});
