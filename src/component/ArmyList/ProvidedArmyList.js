// @flow
import React from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import ArmyListComponent from './ArmyListComponent';
import { Collection } from '../../entity';
import { findArmyGroup } from '../../action/armyGroup';

function ProvidedArmyList({ dispatch, armyGroup, ...props }) {
  return (
    <ArmyListComponent
      fetchArmyList={() => dispatch(findArmyGroup(armyGroup))}
      {...props}
    />
  );
}

const mapStateToProps = (state, ownProps) => {
  const armyList = new Collection({
    items: ownProps.navigation.state.params.armyList,
  });

  return {
    armyGroup: ownProps.navigation.state.params.armyGroup,
    armyList,
    user: state.app.get('me'),
  };
};

const mapDispatchToProps = {
  onSelectArmy: army =>
    NavigationActions.navigate({ routeName: 'Army', params: { army } }),
};

export default connect(mapStateToProps, mapDispatchToProps)(ProvidedArmyList);
