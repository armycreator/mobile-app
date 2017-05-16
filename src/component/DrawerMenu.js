// @flow
import React, { PureComponent } from 'react';
import { TouchableHighlight, View } from 'react-native';
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

const ArmyGroupListHeader = styled.Text`
  margin-horizontal: 15;
  padding: 15;
  color: ${colors.softGray};
  text-align: center;
  border-bottom-width: 1;
  border-bottom-color: ${colors.secondary};
`;

const DrawerHeader = styled.Text`
  color: ${colors.background};
  font-size: 18;
  font-weight: bold;
`;

const DrawerItem = styled.Text`
  color: ${colors.softGray};
  font-weight: bold;
  padding: 15;
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
      { key: 'LastArmyList', routeName: 'LastArmyList' },
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
          armyGroupList.items.size > 0 &&
          <View>
            <ArmyGroupListHeader>Mes groupes</ArmyGroupListHeader>
            {armyGroupList.items.map(armyGroup => (
              <TouchableHighlight
                key={armyGroup.id}
                onPress={() => onSelectArmyGroup(armyGroup)}
                underlayColor="rgba(0,0,0,0.3)"
              >
                <DrawerItem>
                  {armyGroup.name}
                </DrawerItem>
              </TouchableHighlight>
            ))}
          </View>}
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
      routeName: 'ProvidedArmyList',
      params: {
        armyGroup,
        title: armyGroup.name,
      },
    }),
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawerMenu);
