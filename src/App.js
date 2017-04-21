// @flow

import React, { Component } from 'react';
import {
  Button,
  Text,
  TouchableHighlight,
  StatusBar,
  View,
} from 'react-native';
import { AndroidBackButton } from 'react-router-native';
import { connect, Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Map } from 'immutable';
import SideMenu from './component/SideMenu';
import createHistory from 'history/createMemoryHistory';
import styled from 'styled-components/native';
import {
  DrawerNavigator,
  StackNavigator,
  TabNavigator,
} from 'react-navigation';
import sdk from './Sdk';
import colors from './colors';
import { MainView, NavigationBarTitle } from './routes';
import configureStore from './configureStore';
import Layout from './component/Layout';

// global.XMLHttpRequest = global.originalXMLHttpRequest || global.XMLHttpRequest;
const history = createHistory();
const initialState = {};

const Container = styled.View`
  flex: 1;
  background-color: ${colors.background};
`;

// class App extends Component {
//   render() {
//     const { store, history } = this.props;
//
//     return (
//       <Provider store={store}>
//         <ConnectedRouter history={history}>
//           <AndroidBackButton>
//             <Container>
//               <StatusBar hidden />
//               <SideMenu>
//                 <Layout>
//                   <NavigationBarTitle
//                     onMenuPress={() => {
//                       store.dispatch({ type: 'TOGGLE_MENU', isOpen: true });
//                     }}
//                   />
//                   <MainView />
//                 </Layout>
//               </SideMenu>
//             </Container>
//           </AndroidBackButton>
//         </ConnectedRouter>
//       </Provider>
//     );
//   }
// }

class ArmyDetail extends React.Component {
  static navigationOptions = {
    // Nav options can be defined as a function of the navigation prop:
    title: ({ state }) => `Army ${state.params.army}`,
  };
  render() {
    // The screen's current route is passed in to `props.navigation.state`:
    const { params } = this.props.navigation.state;
    return (
      <View>
        <Text>Army {params.army}</Text>
      </View>
    );
  }
}

class ArmyList extends React.Component {
  render() {
    return (
      <View>
        <Text>List of armies</Text>
        <Button
          onPress={() =>
            this.props.navigation.navigate('ArmyDetail', { army: 'Foo' })}
          title="Army Foo"
        />
        <Button
          onPress={() =>
            this.props.navigation.navigate('ArmyDetail', { army: 'Bar' })}
          title="Army Bar"
        />
      </View>
    );
  }
}

class Login extends React.Component {
  render() {
    return (
      <View>
        <Text>Login screen</Text>
        <Button
          onPress={() => this.props.navigation.navigate('ArmyList')}
          title="Login"
        />
      </View>
    );
  }
}

const MainScreenNavigator = DrawerNavigator({
  Login: { screen: Login },
  ArmyList: { screen: ArmyList },
});
MainScreenNavigator.navigationOptions = {
  title: 'Army Creator',
};

const ArmyCreatorApp = {
  Login: { screen: MainScreenNavigator },
  ArmyDetail: { screen: ArmyDetail },
};

@connect(state => ({
  nav: state.nav,
}))
class AppWithNavigationState extends React.Component {
  render() {
    return (
      <AppNavigator
        navigation={addNavigationHelpers({
          dispatch: this.props.dispatch,
          state: this.props.nav,
        })}
      />
    );
  }
}

const store = configureStore(initialState, history, ArmyCreatorApp);

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}

export default () => <AppWithNavigationState />;
// export default () => <App store={store} history={history} />;
