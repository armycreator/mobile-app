// @flow
import React, { PureComponent } from 'react';
import {
  ActivityIndicator,
  ListView,
  RefreshControl,
  TouchableHighlight,
} from 'react-native';
import styled from 'styled-components/native';
import colors from '../../colors';
import { Army, Collection, User } from '../../entity';

export type ArmyListProps = {
  armyList: ?Collection,
  onSelectArmy: Function,
  fetchArmyList: Function,
};

type ArmyListStateProps = {
  refreshing: boolean,
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
  padding: 15px;
`;
const ArmyName = styled.Text`
  color: ${colors.white};
`;
const ArmyPoints = styled.Text`
  color: ${colors.softGray};
`;

export default class ArmyListComponent extends PureComponent {
  props: ArmyListProps;

  state: ArmyListStateProps;

  dataSource: ListView.DataSource;

  constructor(props: ArmyListProps) {
    super(props);

    this.dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    (this: any).renderRow = this.renderRow.bind(this);
    (this: any).onRefresh = this.onRefresh.bind(this);

    this.state = {
      refreshing: false,
    };
  }

  componentDidMount() {
    const { armyList, fetchArmyList } = this.props;

    if (!armyList) {
      fetchArmyList().catch(console.error);
    }
  }

  getArmyListDataSource() {
    if (this.props.armyList) {
      return this.dataSource.cloneWithRows(this.props.armyList.items.toArray());
    }

    return null;
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

  onRefresh() {
    this.setState({
      refreshing: true,
    });

    const stopRefreshing = () => this.setState({ refreshing: false });

    this.props.fetchArmyList().then(stopRefreshing).catch(stopRefreshing);
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
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}
          />
        }
      />
    );
  }
}
