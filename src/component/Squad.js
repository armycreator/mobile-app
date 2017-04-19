// @flow

import React, { PureComponent } from 'react';
import {
  Animated,
  Dimensions,
  ScrollView,
  Switch,
  Text,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import colors from '../colors';
import {
  changeSquadLineActiveStatus,
  fetchSquadDetail,
  onSquadUnmount,
} from '../action/squad';
import { Squad as SquadEntity, SquadLine as SquadLineEntity } from '../entity';

const TitleContainer = styled.View`
  background-color: ${colors.black};
  padding-vertical: 15;
  flex-direction: row;
  justify-content: space-between;
`;

const TitleProgressBar = styled(Animated.View)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  background-color: ${({ active }) => (active ? colors.primary : colors.slateGray)};
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

function SquadLine({ squadLine, handleSwitchSquadLine }) {
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
          onValueChange={value => handleSwitchSquadLine(squadLine, value)}
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

type SquadProps = {
  squad: SquadEntity,
  squadDetail: SquadEntity,
  fetchSquadDetail: Function,
  changeSquadLineActiveStatus: Function,
  onSquadUnmount: Function,
};

type SquadState = {
  activePointsBarWidth: Animated.Value,
};

class Squad extends PureComponent {
  props: SquadProps;

  state: SquadState;

  constructor(props: SquadProps) {
    super(props);

    (this: any).handleSwitchSquadLine = this.handleSwitchSquadLine.bind(this);

    const width = Dimensions.get('window').width;
    const activePointRatio = this.props.squad.points > 0
      ? this.props.squad.activePoints / this.props.squad.points
      : 1;

    this.state = {
      activePointsBarWidth: new Animated.Value(width * activePointRatio),
    };
  }

  componentDidMount() {
    const { squad, fetchSquadDetail } = this.props;

    fetchSquadDetail(squad.id);
  }

  componentDidUpdate(prevProps: SquadProps) {
    if (!prevProps || !prevProps.squadDetail) {
      return;
    }

    const { squadDetail } = this.props;

    if (prevProps.squadDetail.activePoints !== squadDetail.activePoints) {
      const width = Dimensions.get('window').width;
      const activePointRatio = squadDetail.points
        ? squadDetail.activePoints / squadDetail.points
        : 1;

      Animated.timing(this.state.activePointsBarWidth, {
        toValue: width * activePointRatio,
      }).start();
    }
  }

  componentWillUnmount() {
    this.props.onSquadUnmount();
  }

  handleSwitchSquadLine(squadLine: SquadLineEntity, active: boolean) {
    this.props.changeSquadLineActiveStatus(squadLine, active);
  }

  render() {
    const { squadDetail } = this.props;
    if (!squadDetail) {
      return null;
    }
    const squad = squadDetail;

    return (
      <ScrollView>
        <TitleContainer>
          <TitleProgressBar
            active
            style={{ width: this.state.activePointsBarWidth }}
          />
          <Title>{squad.name}</Title>
          <Title>
            {squad.points}{' points'}
          </Title>
        </TitleContainer>

        {squad.squadLineList &&
          squad.squadLineList.map(squadLine => (
            <SquadLine
              key={squadLine.id}
              squadLine={squadLine}
              handleSwitchSquadLine={this.handleSwitchSquadLine}
            />
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
  changeSquadLineActiveStatus,
  onSquadUnmount,
};

export default connect(mapStateToProps, mapDispatchToProps)(Squad);
