// @flow

import React, { Component } from 'react';
import {
  RefreshControl,
  ScrollView,
  View,
  TouchableHighlight,
} from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import styled from 'styled-components/native';
import colors from '../colors';
import { fetchArmyDetail, onArmyUnmount } from '../action/army';
import { Army as ArmyEntity, Squad as SquadEntity } from '../entity';

type ArmyProps = {
  army: ArmyEntity,
  armyDetail: ?ArmyEntity,
  fetchArmyDetail: Function,
  onArmyUnmount: Function,
  onSelectSquad: Function,
};

const TitleContainer = styled.View`
  background-color: ${colors.black};
  padding-vertical: 15;
  flex-direction: row;
  justify-content: space-between;
`;

const TitleProgressBar = styled.View`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: ${({ percentage }) => `${percentage}%`}
  background-color: ${({ active }) =>
    active ? colors.primary : colors.slateGray};
`;

const Title = styled.Text`
  margin-left: ${({ first }) => (first ? 10 : 0)};
  margin-right: ${({ last }) => (last ? 10 : 0)};
  color: ${colors.white};
  text-align: center;
`;

const ArmyDescription = styled.Text`
  color: ${colors.softGray};
  padding: 15px;
`;

const UnitTypeContainer = styled.View`
  background-color: ${colors.slateGray};
  border-top-width: 1;
  border-top-color: ${colors.black};
  border-bottom-width: 1;
  border-bottom-color: ${colors.black};
  padding-horizontal: 15;
  padding-vertical: 5;
  flex-direction: row;
  justify-content: space-between;
`;
const UnitType = styled.Text`
  color: ${colors.secondary};
`;

const SquadContainer = styled.View`
  padding: 15px;
  flex-direction: row;
  justify-content: space-between;
  border-top-width: ${({ isFirst }) => (isFirst ? 0 : 1)};
  border-top-color: ${colors.black};
`;

const Squad = styled.Text`
  color: ${colors.white};
`;

const SquadPoints = styled.Text`
  color: ${colors.softGray};
`;

const SquadListPoints = styled.Text`
  color: ${colors.softGray};
  align-self: flex-end;
`;

function SquadListByType({ squadListByType, onSelectSquad }) {
  const unitType = squadListByType.unitType;
  const squadList = squadListByType.squadList;

  if (squadList.size <= 0) {
    return null;
  }

  return (
    <View>
      <UnitTypeContainer>
        <UnitType>{unitType.name} pts</UnitType>

        <SquadListPoints>
          {squadListByType.points} pts
          {squadListByType.hasInactiveSquad &&
            ` (${squadListByType.activePoints} pts actifs)`}
        </SquadListPoints>
      </UnitTypeContainer>

      {squadList.map((squad, key) =>
        <TouchableHighlight key={squad.id} onPress={() => onSelectSquad(squad)}>
          <SquadContainer isFirst={key === 0}>
            <Squad>
              {squad.name}
            </Squad>
            <SquadPoints>
              {squad.points} pts
              {squad.hasInactiveSquad && ` (${squad.activePoints} pts actifs)`}
            </SquadPoints>
          </SquadContainer>
        </TouchableHighlight>
      )}
    </View>
  );
}

type ArmyStateProps = {
  refreshing: boolean,
};

class Army extends Component {
  props: ArmyProps;

  state: ArmyStateProps;

  constructor(props) {
    super(props);

    this.state = {
      refreshing: false,
    };

    (this: any).onRefresh = this.onRefresh.bind(this);
  }

  componentDidMount() {
    const { army, fetchArmyDetail } = this.props;

    fetchArmyDetail(army.id);
  }

  componentWillUnmount() {
    this.props.onArmyUnmount();
  }

  onRefresh() {
    const { army, fetchArmyDetail } = this.props;

    const stopRefreshing = () => this.setState({ refreshing: false });

    this.setState({
      refreshing: true,
    });

    fetchArmyDetail(army.id).then(stopRefreshing).catch(stopRefreshing);
  }

  render() {
    const { armyDetail, onSelectSquad } = this.props;

    if (!armyDetail) {
      return null;
    }

    const maxPoints = armyDetail.wanted_points || armyDetail.points;
    const pointsPercentage = maxPoints && 100 * armyDetail.points / maxPoints;
    const activePointsPercentage = 100 * armyDetail.active_points / maxPoints;

    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}
          />
        }
      >
        <TitleContainer>
          {pointsPercentage > 0 &&
            <TitleProgressBar percentage={pointsPercentage} />}
          {activePointsPercentage > 0 &&
            <TitleProgressBar percentage={activePointsPercentage} active />}
          <Title first>{armyDetail.breed.name}</Title>
          <Title last>
            {armyDetail.points}{' points'}
          </Title>
        </TitleContainer>

        <ArmyDescription>{armyDetail.description}</ArmyDescription>

        {armyDetail.squadListByType.map(squadListByType =>
          <SquadListByType
            key={squadListByType.unitType.id}
            squadListByType={squadListByType}
            onSelectSquad={onSelectSquad}
          />
        )}
      </ScrollView>
    );
  }
}

function goToSquad(squad: SquadEntity) {
  return NavigationActions.navigate({ routeName: 'Squad', params: { squad } });
}

const mapStateToProps = (state, ownProps) => ({
  armyDetail: state.app.get('currentArmyDetail'),
  army: ownProps.navigation.state.params.army,
});

const mapDispatchToProps = {
  fetchArmyDetail,
  onArmyUnmount,
  onSelectSquad: goToSquad,
};

export default connect(mapStateToProps, mapDispatchToProps)(Army);
