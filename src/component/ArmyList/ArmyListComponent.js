// @flow
import React, { PureComponent } from 'react';
import { ActivityIndicator, ListView, TouchableHighlight } from 'react-native';
import styled from 'styled-components/native';
import colors from '../../colors';
import { Army, Collection, User } from '../../entity';

type ArmyListProps = {
  user: ?User,
  armyList: ?Collection,
  onSelectArmy: Function,
  findArmyForUser: ?Function,
};

const ActivityIndicatorContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ArmyRow = styled.View`
  background-color: ${colors.background};
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  border-bottom-width: 1;
  border-bottom-color: ${colors.black};
  padding: 15;
`;
const ArmyName = styled.Text`
  color: ${colors.white};
`;
const ArmyPoints = styled.Text`
  color: ${colors.softGray};
`;

export default class ArmyListComponent extends PureComponent {
  props: ArmyListProps;

  dataSource: ListView.DataSource;

  constructor(props: ArmyListProps) {
    super(props);

    this.dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    (this: any).renderRow = this.renderRow.bind(this);
  }

  componentDidMount() {
    const { armyList, findArmyForUser, user } = this.props;

    if (user && !armyList && findArmyForUser) {
      return findArmyForUser(user).catch(console.error);
    }
  }

  componentDidUpdate(prevProps: ArmyListProps) {
    const { findArmyForUser, user } = this.props;

    if (user && !prevProps.user && findArmyForUser) {
      return findArmyForUser(user).catch(console.error);
    }
  }

  getArmyListDataSource() {
    if (this.props.armyList) {
      return this.dataSource.cloneWithRows(this.props.armyList.items.toArray());
    }
  }

  renderRow(army: Army) {
    return (
      <TouchableHighlight onPress={() => this.props.onSelectArmy(army)}>
        <ArmyRow key={army.id}>
          <ArmyName>{army.name}</ArmyName>
          <ArmyPoints>
            {army.active_points}
            {' pts'}
          </ArmyPoints>
        </ArmyRow>
      </TouchableHighlight>
    );
  }

  render() {
    const { armyList } = this.props;

    if (!armyList) {
      return (
        <ActivityIndicatorContainer>
          <ActivityIndicator color={colors.primary} />
        </ActivityIndicatorContainer>
      );
    }

    if (armyList.items.size === 0) {
      return (
        <ArmyRow>
          <ArmyName>
            Aucune armée trouvé
          </ArmyName>
        </ArmyRow>
      );
    }

    return (
      <ListView
        dataSource={this.getArmyListDataSource()}
        renderRow={this.renderRow}
      />
    );
  }
}
