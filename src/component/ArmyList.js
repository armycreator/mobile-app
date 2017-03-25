// @flow
import React, { Component } from 'react';
import { ActivityIndicator, ListView, Text, View } from 'react-native';
import { List, Map } from 'immutable';
import RestClientSdk from 'rest-client-sdk';
import styled from 'styled-components/native';
import colors from '../colors';

type ArmyListProps = {
  sdk: RestClientSdk,
  user: Map<any, any>,
};

const Container = styled.View`
  flex: 1;
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
  color: ${colors.softGrey};
`;

class ArmyList extends Component {
  props: ArmyListProps;

  state: {
    armyList: ?Map<any, any>,
  };

  constructor(props: ArmyListProps) {
    super(props);

    this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      armyList: null,
    };
  }

  componentDidMount() {
    const { sdk, user } = this.props;

    return sdk.army.findByUser(user)
      .then((data) => this.setState({
        armyList: this.dataSource.cloneWithRows(
          data.get('items').toArray()
        ),
      }))
      .catch(console.error)
    ;
  }

  renderRow(army) {
    return (
      <Army key={army.get('id')}>
        <ArmyName>{army.get('name')}</ArmyName>
        <ArmyPoints>
          {army.get('active_points')}
          {' pts'}
        </ArmyPoints>
      </Army>
    );
  }

  render () {
    const { user } = this.props;

    if (this.state.armyList === null) {
      return (<View>
        <ActivityIndicator color={colors.primary} />
      </View>);
    }

    return (
      <ListView
        dataSource={this.state.armyList}
        renderRow={this.renderRow}
      />
    );
  }
}

export default ArmyList;
