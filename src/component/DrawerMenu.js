// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import { DrawerItems } from 'react-navigation';
import colors from '../colors';
import User from '../entity/User';

const Container = styled.View`
  flex: 1;
  background-color: ${colors.background};
`;

const DrawerHeaderContainer = styled.View`
  backgroundColor: ${colors.secondary};
  padding: 15;
`;

const DrawerHeader = styled.Text`
  color: ${colors.background};
  font-size: 18;
  font-weight: bold;
`;

type Props = {
  me: ?User,
  navigation: any,
};
type Route = { key: string, routeName: string };

class DrawerMenu extends PureComponent {
  props: Props;
  state: { routes: Array<Route> };
  loggedRoutes: Array<Route>;
  anonymousRoutes: Array<Route>;

  constructor(props: Props) {
    super(props);

    this.state = {
      routes: [],
    };

    this.loggedRoutes = [
      { key: 'ArmyList', routeName: 'ArmyList' },
      { key: 'Logout', routeName: 'Logout' },
    ];
    this.anonymousRoutes = [{ key: 'Login', routeName: 'Login' }];
  }

  // componentDidMount() {
  //   console.log('mount');
  //   sdk.tokenStorage
  //     .hasAccessToken()
  //     .then(hasAccessToken => {
  //       if (!hasAccessToken) {
  //         throw new Error('No access token found');
  //       }
  //     })
  //     .then(() => this.setState({ routes: this.loggedRoutes }))
  //     .catch(() => this.setState({ routes: this.anonymousRoutes }));
  // }

  // componentDidUpdate() {
  //   console.log('update');
  // }

  render() {
    const { me, navigation, ...rest } = this.props;

    const newNavigation = navigation;
    newNavigation.state = Object.assign({}, navigation.state, {
      routes: me ? this.loggedRoutes : this.anonymousRoutes,
    });

    return (
      <Container>
        <DrawerHeaderContainer>
          <DrawerHeader>Army Creator</DrawerHeader>
        </DrawerHeaderContainer>

        <DrawerItems navigation={newNavigation} {...rest} />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  me: state.app.get('me'),
});

export default connect(mapStateToProps)(DrawerMenu);
