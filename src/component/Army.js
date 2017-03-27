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
  backgroundColor: ${colors.black};
  padding-vertical: 15;
  padding-horizontal: 10;
  flex-direction: row;
  justify-content: space-between;
`;
const Title = styled.Text`
  color: ${colors.white};
  text-align: center;
`;

class Army extends Component {
  props: ArmyProps;

  state: ArmyState;

  constructor(props) {
    super(props);

    this.state = {
      armyDetail: null,
    };
  }

  componentDidMount() {
    const { army, sdk } = this.props;

    return sdk.army.find(army.get('id'))
      .then((data) => this.setState({
        armyDetail: data,
      }))
      .catch(console.error)
  }

  render() {
    const { army } = this.props;
    const { armyDetail } = this.state;

    if (!armyDetail) {
      return null;
    }
    console.log(armyDetail.getIn(['_embedded', 'squad_list_by_type']).first().get('unitType'));

    return (
      <View>
        <TitleContainer>
          <Title>{army.get('name')}</Title>
          <Title>
            {armyDetail.get('points')}{' points'}
          </Title>
        </TitleContainer>

        <Text>{armyDetail.get('description')}</Text>

        {armyDetail.getIn(['_embedded', 'squad_list_by_type']).map(tmp => {
          const unitType = tmp.get('unitType');
          const squatList = tmp.get('squatList');

          return (<View key={unitType.get('id')}>
            <Text>{unitType.get('name')}</Text>
          </View>);
        })}
      </View>
    );
  }
};

export default Army;
