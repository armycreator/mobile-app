// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  ActivityIndicator,
  ListView,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { List, Map } from 'immutable';
import styled from 'styled-components/native';
import { NavigationActions } from 'react-navigation';
import colors from '../colors';
import { findArmyForUser } from '../action/army';
import { Collection, User } from '../entity';

type ArmyListProps = {
  user: User,
  armyList: Collection,
  onSelectArmy: Function,
  findArmyForUser: Function,
};

const Container = styled.View`
  flex: 1;
`;

const ActivityIndicatorContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Army = styled.View`
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

class ArmyList extends Component {
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

    if (!armyList) {
      return findArmyForUser(user).catch(console.error);
    }
  }

  renderRow(army) {
    return (
      <TouchableHighlight onPress={() => this.props.onSelectArmy(army)}>
        <Army key={army.id}>
          <ArmyName>{army.name}</ArmyName>
          <ArmyPoints>
            {army.active_points}
            {' pts'}
          </ArmyPoints>
        </Army>
      </TouchableHighlight>
    );
  }

  getArmyListDataSource() {
    return this.dataSource.cloneWithRows(this.props.armyList.items.toArray());
  }

  render() {
    const { armyList, user } = this.props;

    if (!armyList) {
      return (
        <ActivityIndicatorContainer>
          <ActivityIndicator color={colors.primary} />
        </ActivityIndicatorContainer>
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

const mapStateToProps = state => ({
  user: state.app.get('me'),
  armyList: state.app.get('lastArmyList'),
});

const mapDispatchToProps = {
  onSelectArmy: army =>
    NavigationActions.navigate({ routeName: 'Army', params: { army } }),
  findArmyForUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(ArmyList);
