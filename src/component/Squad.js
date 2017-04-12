import React, { PureComponent } from 'react';
import { Switch, Text, View } from 'react-native';
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

const SquadLineContainer = styled.View`
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

function SquadLineStuff({ squadLineStuff }) {
  return <Text>{squadLineStuff.number}x Ablative Plating MAR</Text>;
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

    return (
      <View>
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
            <SquadLineContainer key={squadLine.id}>
              <SquadLineTitleContainer>
                <SquadLineTitle>
                  {squadLine.number}x {squadLine.unit.name}
                </SquadLineTitle>

                <SquadLinePoints>
                  {squadLine.points} pts
                </SquadLinePoints>

                <Switch
                  value={!squadLine.inactive}
                  onValueChange={value =>
                    this.handleSwitchSquadLine(squadLine, value)}
                />
              </SquadLineTitleContainer>

              <View>
                {squad.squadLineStuffList.map(squadLineStuff => (
                  <SquadLineStuff
                    key={squadLineStuff.id}
                    squadLineStuff={squadLineStuff}
                  />
                ))}
              </View>
            </SquadLineContainer>
          ))}

        <View>
          <View>
            <Text>
              1x DREAD Retribution class
            </Text>
            <Text>
              300 pts
            </Text>
            <Text>
              toggle
            </Text>
          </View>
        </View>
        <View>
          <Text>1x Ablative Plating MAR</Text>
          <Text>...</Text>
          <Text>1x Scatter Weapons - Gun rack | 5 pts</Text>
          <Text>1x split gfire (fun racks) | 5 pts</Text>
        </View>

        <View>
          <View>
            <Text>
              1x ESCORT Bcukler Class
            </Text>
            <Text>
              15 pts
            </Text>
            <Text>
              toggle
            </Text>
          </View>
        </View>
        <View>
          <Text>1x Primary weapon - gun rack</Text>
          <Text>1x Difficult targe - MAR</Text>
        </View>
      </View>
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
