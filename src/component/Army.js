// @flow

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components/native';
import RestClientSdk from 'rest-client-sdk';
import colors from '../colors';

type ArmyProps = {
  army: Map<any, any>,
  sdk: RestClientSdk,
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

function SquadListByType({ squadListByType }) {
  const unitType = squadListByType.get('unitType');
  const squadList = squadListByType.get('squadList');

  if (squadList.size <= 0) {
    return null;
  }

  return (
    <View key={unitType.get('id')}>
      <UnitTypeContainer>
        <UnitType>{unitType.get('name')}</UnitType>
      </UnitTypeContainer>

      {squadList.map((squad, key) =>
        <SquadContainer key={squad.get('id')} isFirst={key === 0}>
          <Squad>
            {squad.get('name')}
          </Squad>
          <SquadPoints>
            666 pts
          </SquadPoints>
        </SquadContainer>
      )}
    </View>
  );
}

class Army extends Component {
  props: ArmyProps;

  state: ArmyState;

  constructor(props: ArmyProps) {
    super(props);

    this.state = {
      armyDetail: null,
    };
  }

  componentDidMount() {
    const { army, sdk } = this.props;

    return sdk.army.find(army.get('id'))
      .then((data) => this.setState(() => ({
        armyDetail: data,
      })))
      .catch(console.error)
  }

  render() {
    const { army } = this.props;
    const { armyDetail } = this.state;


    if (!armyDetail) {
      return null;
    }

    const maxPoints = army.get('wanted_points') || army.get('points');

    const pointsPercentage = maxPoints && 100 * army.get('points') / maxPoints;

    const activePointsPercentage = 100 * army.get('active_points') / army.get('points');

    return (
      <View>
        <TitleContainer>
          {pointsPercentage > 0 &&
            <TitleProgressBar percentage={pointsPercentage} />
          }
          {activePointsPercentage > 0 &&
            <TitleProgressBar percentage={activePointsPercentage} active />
          }
          <Title>{army.getIn(['_embedded', 'breed', 'name'])}</Title>
          <Title>
            {armyDetail.get('points')}{' points'}
          </Title>
        </TitleContainer>

        <ArmyDescription>{armyDetail.get('description')}</ArmyDescription>

        {armyDetail.getIn(['_embedded', 'squad_list_by_type']).map(squadListByType =>
          <SquadListByType
            key={squadListByType.getIn([ 'unitType', 'id' ])}
            squadListByType={squadListByType}
          />
        )}
      </View>
    );
  }
};

export default Army;
