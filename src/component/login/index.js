// @flow

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import styled from 'styled-components/native';
import { login } from '../../action/login';
import Button from '../Button';
import colors from '../../colors';

type Props = {
  login: Function,
};

type NativeEvent = {
  nativeEvent: Object,
};

const Header = styled.Text`
  color: ${colors.background};
  font-weight: bold;
  font-size: 18;
`;

const HeaderContainer = styled.View`
  padding: 15;
  margin-bottom: 15;
  background-color: ${colors.secondary};
`;

class Login extends Component {
  props: Props;

  state: {
    username: string,
    password: string,
    errorMessage: ?string,
    loginStatus: ?string,
  };
  passwordRef: ?Object;

  constructor(props: Props) {
    super(props);

    (this: any).handleLogin = this.handleLogin.bind(this);
    (this: any).handleUsernameChange = this.handleUsernameChange.bind(this);
    (this: any).handleUsernameSubmit = this.handleUsernameSubmit.bind(this);
    (this: any).handlePasswordChange = this.handlePasswordChange.bind(this);

    this.passwordRef = null;

    this.state = {
      username: '',
      password: '',
      errorMessage: null,
      loginStatus: null,
    };
  }

  handleLogin(event: Event) {
    const { login } = this.props;

    event.preventDefault();

    this.setState(prevProps => ({
      errorMessage: null,
      loginStatus: 'IN_PROGRESS',
    }));

    login(this.state.username, this.state.password).catch(e => {
      this.setState(prevProps => ({
        errorMessage: e.error_description,
        loginStatus: 'FAILED',
      }));
    });
  }

  handleUsernameChange(event: NativeEvent) {
    this.setState({
      username: event.nativeEvent.text,
    });
  }

  handleUsernameSubmit() {
    if (this.passwordRef) {
      this.passwordRef.focus();
    }
  }

  handlePasswordChange(event: NativeEvent) {
    this.setState({
      password: event.nativeEvent.text,
    });
  }

  render() {
    const isLoginButtonDisabled = !(this.state.username && this.state.password);

    return (
      <KeyboardAvoidingView behavior="padding" style={styles.content}>
        <HeaderContainer>
          <Header>ArmyCreator - Connexion</Header>
        </HeaderContainer>

        <View style={styles.content}>
          <View style={styles.loginForm}>
            <Text style={styles.label}>Utilisateur</Text>
            <TextInput
              autoCapitalize="none"
              autoFocus
              style={styles.input}
              defaultValue={this.state.username}
              onChange={this.handleUsernameChange}
              onSubmitEditing={this.handleUsernameSubmit}
              returnKeyType="next"
            />
            <Text style={styles.label}>Mot de passe</Text>
            <TextInput
              ref={ref => (this.passwordRef = ref)}
              autoCapitalize="none"
              textDecorationLine="none"
              style={styles.input}
              secureTextEntry
              defaultValue={this.state.password}
              onChange={this.handlePasswordChange}
              returnKeyType="go"
              onSubmitEditing={this.handleLogin}
            />

            {this.state.errorMessage &&
              <View style={styles.errorMessage}>
                <Text style={styles.errorMessageText}>
                  {this.state.errorMessage}
                </Text>
              </View>}

            <Button
              color="primary"
              onPress={this.handleLogin}
              disabled={isLoginButtonDisabled}
            >
              {this.state.loginStatus !== 'IN_PROGRESS'
                ? <Text
                    style={[
                      styles.primaryButtonText,
                      isLoginButtonDisabled && styles.buttonDisabled,
                    ]}
                  >
                    Valider
                  </Text>
                : <View>
                    <ActivityIndicator color={colors.white} />
                  </View>}
            </Button>

            <Button
              color="danger"
              onPress={() =>
                this.setState({
                  username: 'testjdu',
                  password: 'testjdu',
                  loginStatus: null,
                })}
              disabled={this.state.loginStatus === 'IN_PROGRESS'}
            >
              <Text
                style={[
                  styles.primaryButtonText,
                  isLoginButtonDisabled && styles.buttonDisabled,
                ]}
              >
                Debug Fill
              </Text>
            </Button>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
  },

  loginForm: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: colors.white,
  },

  primaryButton: {
    backgroundColor: colors.primary,
    paddingVertical: 20,
  },

  primaryButtonText: {
    color: colors.white,
    textAlign: 'center',
  },

  buttonDisabled: {
    opacity: 0.5,
  },

  label: {
    height: 30,
    textAlignVertical: 'bottom',
  },
  input: {
    height: 40,
  },

  errorMessage: {
    backgroundColor: colors.danger,
    padding: 10,
    marginBottom: 10,
  },
  errorMessageText: {
    color: colors.white,
    textAlign: 'center',
  },
});

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  login,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
