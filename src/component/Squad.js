import React, { PureComponent } from 'react';
import { ScrollView, Switch, Text, View } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import colors from '../colors';
import { fetchSquadDetail } from '../action/squad';
import { Squad as SquadEntity, SquadLine as SquadLineEntity } from '../entity';

type ArmyProps = {
  squad: SquadEntity,
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
  background-color: ${({ active }) => active ? colors.primary : colors.slateGray};
`;

const Title = styled.Text`
  margin-horizontal: 10;
  color: ${colors.white};
  text-align: center;
`;

const SquadLineTitleContainer = styled.View`
  background-color: ${colors.slateGray};
  border-top-width: 1;
  border-top-color: ${colors.black};
  border-bottom-width: 1;
  border-bottom-color: ${colors.black};
  padding-horizontal: 15;
  padding-vertical: 5;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const SquadLineTitle = styled.Text`
  color: ${colors.secondary};
  flex: 1;
`;

const SquadLinePoints = styled.Text`
  margin-right: 10;
  color: ${colors.softGray};
`;

const SquadLineStuffView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 10;
  border-bottom-width: 1;
  border-bottom-color: ${colors.black};
`;

const SquadLineStuffText = styled.Text`
  color: ${colors.white};
`;

function SquadLine({ squadLine }) {
  return (
    <View>
      <SquadLineTitleContainer>
        <SquadLineTitle>
          {squadLine.number}x {squadLine.unit.name}
        </SquadLineTitle>

        <SquadLinePoints>
          {squadLine.points} pts
        </SquadLinePoints>

        <Switch
          value={!squadLine.inactive}
          onValueChange={value => this.handleSwitchSquadLine(squadLine, value)}
        />
      </SquadLineTitleContainer>

      <View>
        {squadLine.squadLineStuffList.map(squadLineStuff => (
          <SquadLineStuff
            key={squadLineStuff.id}
            squadLineStuff={squadLineStuff}
          />
        ))}
      </View>
    </View>
  );
}

function SquadLineStuff({ squadLineStuff }) {
  return (
    <SquadLineStuffView>
      <SquadLineStuffText>
        {squadLineStuff.number}x {squadLineStuff.unitStuff.stuff.name}
      </SquadLineStuffText>
      <SquadLineStuffText>
        {squadLineStuff.unitStuff.points > 0 &&
          `${squadLineStuff.unitStuff.points} pts`}
      </SquadLineStuffText>
    </SquadLineStuffView>
  );
}

class Squad extends PureComponent {
  constructor(props) {
    super(props);

    this.handleSwitchSquadLine = this.handleSwitchSquadLine.bind(this);
  }

  componentDidMount() {
    const { squad, fetchSquadDetail } = this.props;

    fetchSquadDetail(squad.id);
  }

  handleSwitchSquadLine(squadLine: SquadLineEntity, active: boolean) {
    console.log(active);
  }

  render() {
    const { squadDetail } = this.props;
    if (!squadDetail) {
      return null;
    }
    const squad = squadDetail;

    const activePointsPercentage = squad.points
      ? 100 * squad.activePoints / squad.points
      : 100;

    console.log(activePointsPercentage);
    return (
      <ScrollView>
        <TitleContainer>
          {activePointsPercentage > 0 &&
            <TitleProgressBar percentage={activePointsPercentage} active />}
          <Title>{squad.name}</Title>
          <Title>
            {squad.points}{' points'}
          </Title>
        </TitleContainer>

        {squad.squadLineList &&
          squad.squadLineList.map(squadLine => (
            <SquadLine key={squadLine.id} squadLine={squadLine} />
          ))}
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  squadDetail: state.app.get('currentSquadDetail'),
});

const mapDispatchToProps = {
  fetchSquadDetail,
};

export default connect(mapStateToProps, mapDispatchToProps)(Squad);
