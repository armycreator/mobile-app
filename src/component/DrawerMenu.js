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
  padding: 15px;
`;

const ArmyGroupListHeader = styled.Text`
  margin-horizontal: 15;
  padding: 15px;
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
  padding: 15px;
`;

type Props = {
  me: ?User,
  items: Array<any>,
  findArmyGroupForUser: Function,
  armyGroupList: ?Collection,
  onSelectArmyGroup: Function,
};

class DrawerMenu extends PureComponent {
  props: Props;
  loggedRoutes: Array<string>;
  anonymousRoutes: Array<string>;

  constructor(props: Props) {
    super(props);

    this.loggedRoutes = ['LastArmyList', 'Logout'];
    this.anonymousRoutes = ['Login'];
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
    const { armyGroupList, me, onSelectArmyGroup, items, ...rest } = this.props;

    const filteredItems = me
      ? items.filter(item =>
          this.loggedRoutes.find(tmp => tmp === item.routeName)
        )
      : items.filter(item =>
          this.anonymousRoutes.find(tmp => tmp === item.routeName)
        );

    return (
      <Container>
        <DrawerHeaderContainer>
          <DrawerHeader>Army Creator</DrawerHeader>
        </DrawerHeaderContainer>

        <DrawerItems items={filteredItems} {...rest} />

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
