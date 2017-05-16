// @flow
import React from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import ArmyListComponent, { type ArmyListProps } from './ArmyListComponent';
import { Collection } from '../../entity';
import { findArmyGroup } from '../../action/armyGroup';

type ProvidedArmyListType = {
  dispatch: Function,
  armyGroupId: string,

  // from ArmyListComponent, I did not found how to extend type
  armyList: ?Collection,
  onSelectArmy: Function,
  fetchArmyList: Function,
};

function ProvidedArmyList({
  dispatch,
  armyGroupId,
  ...props
}: ProvidedArmyListType) {
  return (
    <ArmyListComponent
      fetchArmyList={() => findArmyGroup(armyGroupId)(dispatch)}
      {...props}
    />
  );
}

const mapStateToProps = (state, ownProps) => {
  const armyGroupId = ownProps.navigation.state.params.armyGroup.id;

  const armyGroup =
    state.app.getIn(['refreshedArmyGroupList', armyGroupId]) ||
    ownProps.navigation.state.params.armyGroup;

  return {
    armyGroupId,
    armyList: new Collection({ items: armyGroup.armyList }),
    user: state.app.get('me'),
  };
};

const mapDispatchToProps = dispatch => ({
  onSelectArmy: army =>
    dispatch(
      NavigationActions.navigate({ routeName: 'Army', params: { army } })
    ),
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(ProvidedArmyList);
