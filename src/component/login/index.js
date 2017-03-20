import React, { Component, PropTypes } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';

class Login extends Component {
  constructor(props) {
    super(props);

    this.handleLogin = this.handleLogin.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleUsernameSubmit = this.handleUsernameSubmit.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);

    this.passwordRef = null;

    this.state = {
      username: null,
      password: null,
      errorMessage: null,
    };
  }

  handleLogin(event) {
    const { sdk, onLogged } = this.props;

    event.preventDefault();

    this.setState((prevProps) => ({ errorMessage: null }));

    sdk.tokenStorage.generateToken(this.state)
      .then(onLogged)
      .catch((e) => {
        this.setState((prevProps) => ({ errorMessage: e.error_description }));
      })
    ;
  }

  handleUsernameChange(event) {
    this.setState({
      username: event.nativeEvent.text,
    });
  }

  handleUsernameSubmit() {
    if (this.passwordRef) {
      this.passwordRef.focus();
    }
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
              autoFocus
              style={styles.input}
              onChange={this.handleUsernameChange}
              onSubmitEditing={this.handleUsernameSubmit}
              returnKeyType="next"
            />
            <Text style={styles.label}>Mot de passe</Text>
            <TextInput
              ref={(ref) => this.passwordRef = ref}
              autoCapitalize="none"
              textDecorationLine="none"
              style={styles.input}
              secureTextEntry
              onChange={this.handlePasswordChange}
              returnKeyType="go"
              onSubmitEditing={this.handleLogin}
            />

            {this.state.errorMessage &&
              <Text>{this.state.errorMessage}</Text>
            }

            <TouchableHighlight style={styles.primaryButton} onPress={this.handleLogin}>
              <Text style={styles.primaryButtonText}>Valider</Text>
            </TouchableHighlight>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

Login.propTypes = {
  sdk: PropTypes.object.isRequired,
  onLogged: PropTypes.func.isRequired,
};

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


export default Login;
