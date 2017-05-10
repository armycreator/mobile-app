// @flow
import React, { PureComponent } from 'react';
import { Text, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import { DrawerItems, NavigationActions } from 'react-navigation';
import colors from '../colors';
import { Collection, User } from '../entity';
import { findArmyGroupForUser } from '../action/armyGroup';

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
  findArmyGroupForUser: Function,
  armyGroupList: ?Collection,
  onSelectArmyGroup: Function,
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

  componentDidMount() {
    const { me } = this.props;

    if (me) {
      this.props.findArmyGroupForUser(me);
    }
  }

  componentDidUpdate(prevProps) {
    const { me } = this.props;

    if (!prevProps.me && me) {
      this.props.findArmyGroupForUser(me);
    }
  }

  render() {
    const {
      armyGroupList,
      me,
      navigation,
      onSelectArmyGroup,
      ...rest
    } = this.props;

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

        {armyGroupList &&
          armyGroupList.items.map(armyGroup => (
            <TouchableHighlight
              key={armyGroup.id}
              onPress={() => onSelectArmyGroup(armyGroup)}
            >
              <Text>
                {armyGroup.name}
              </Text>
            </TouchableHighlight>
          ))}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  me: state.app.get('me'),
  armyGroupList: state.app.get('armyGroupList'),
});

const mapDispatchToProps = {
  findArmyGroupForUser,
  onSelectArmyGroup: armyGroup =>
    NavigationActions.navigate({
      routeName: 'ArmyList',
      params: { armyList: armyGroup.armyList },
    }),
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawerMenu);
