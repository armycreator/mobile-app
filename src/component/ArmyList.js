// @flow
import React, { Component } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { List, Map } from 'immutable';
import RestClientSdk from 'rest-client-sdk';
import colors from '../colors';

type ArmyListProps = {
  sdk: RestClientSdk,
  user: Map<any, any>,
};

class ArmyList extends Component {
  props: ArmyListProps;

  state: {
    armyList: ?Map<any, any>,
  };

  constructor(props: ArmyListProps) {
    super(props);

    this.state = {
      armyList: null,
    };
  }

  componentDidMount() {
    const { sdk, user } = this.props;

    return sdk.army.findByUser(user)
      .then((armyList) => this.setState({ armyList }))
      .catch(console.error)
    ;
  }

  render () {
    const { user } = this.props;

    if (!this.state.armyList) {
      return (<View>
        <ActivityIndicator color={colors.primary} />
      </View>);
    }

    return (
      <View>
        {this.state.armyList.get('items').map(item =>
          <View key={item.get('id')}>
            <Text>{item.get('name')}</Text>
          </View>
        )}
      </View>
    );
  }
}

export default ArmyList;
