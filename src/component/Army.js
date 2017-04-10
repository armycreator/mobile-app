// @flow

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import RestClientSdk from 'rest-client-sdk';
import colors from '../colors';
import { fetchArmyDetail, onArmyUnmount } from '../action/army';
import { Army as ArmyEntity } from '../entity';

type ArmyProps = {
  army: ArmyEntity,
  armyDetail: ?ArmyEntity,
  fetchArmyDetail: Function,
  onArmyUnmount: Function,
};

type ArmyState = {
  armyDetail: ?Map<any, any>,
};

const TitleContainer = styled.View`
  background-color: ${colors.black};
  padding-vertical: 15;
  padding-horizontal: 10;
  flex-direction: row;
  justify-content: space-between;
`;

const TitleProgressBar = styled.View`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: ${({ percentage }) => `${percentage}%`}
  background-color: ${({ active }) => active ? colors.primary : colors.slateGray};
`;

const Title = styled.Text`
  color: ${colors.white};
  text-align: center;
`;

const ArmyDescription = styled.Text`
  color: ${colors.softGray};
  padding: 15;
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
  padding: 15;
  flex-direction: row;
  justify-content: space-between;
  border-top-width: ${({ isFirst }) => isFirst ? 0 : 1};
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

function SquadListByType({ squadListByType }) {
  const unitType = squadListByType.unitType;
  const squadList = squadListByType.squadList;

  if (squadList.size <= 0) {
    return null;
  }

  return (
    <View key={unitType.id}>
      <UnitTypeContainer>
        <UnitType>{unitType.name} pts</UnitType>

        <SquadListPoints>
          {squadListByType.points} pts
          {squadListByType.hasInactiveSquad &&
            ` (${squadListByType.activePoints} pts actifs)`}
        </SquadListPoints>
      </UnitTypeContainer>

      {squadList.map((squad, key) => (
        <SquadContainer key={squad.id} isFirst={key === 0}>
          <Squad>
            {squad.name}
          </Squad>
          <SquadPoints>
            {squad.points} pts
            {squad.hasInactiveSquad && ` (${squad.activePoints} pts actifs)`}
          </SquadPoints>
        </SquadContainer>
      ))}
    </View>
  );
}

class Army extends Component {
  props: ArmyProps;

  constructor(props: ArmyProps) {
    super(props);
  }

  componentDidMount() {
    const { army, fetchArmyDetail } = this.props;

    fetchArmyDetail(army.id);
  }

  componentWillUnmount() {
    const { onArmyUnmount } = this.props;

    onArmyUnmount();
  }

  render() {
    const { army, armyDetail } = this.props;

    if (!armyDetail) {
      return null;
    }

    const maxPoints = army.wanted_points || army.points;

    const pointsPercentage = maxPoints && 100 * army.points / maxPoints;

    const activePointsPercentage = 100 * army.active_points / army.points;

    return (
      <View>
        <TitleContainer>
          {pointsPercentage > 0 &&
            <TitleProgressBar percentage={pointsPercentage} />}
          {activePointsPercentage > 0 &&
            <TitleProgressBar percentage={activePointsPercentage} active />}
          <Title>{army.breed.name}</Title>
          <Title>
            {armyDetail.points}{' points'}
          </Title>
        </TitleContainer>

        <ArmyDescription>{armyDetail.description}</ArmyDescription>

        {armyDetail.squadListByType.map(squadListByType => (
          <SquadListByType
            key={squadListByType.unitType.id}
            squadListByType={squadListByType}
          />
        ))}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  armyDetail: state.app.get('currentArmyDetail'),
});

const mapDispatchToProps = {
  fetchArmyDetail,
  onArmyUnmount,
};

export default connect(mapStateToProps, mapDispatchToProps)(Army);
