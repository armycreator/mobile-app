// @flow
import React from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import ArmyListComponent from './ArmyListComponent';
import { findArmyForUser } from '../../action/army';
import { Collection, User } from '../../entity';

type LastArmyListType = {
  dispatch: Function,
  user: ?User,
  armyList: ?Collection,
  onSelectArmy: Function,
};

function LastArmyList({ dispatch, user, ...props }: LastArmyListType) {
  if (!user) {
    return null;
  }

  return (
    <ArmyListComponent
      fetchArmyList={() => dispatch(findArmyForUser(user))}
      {...props}
    />
  );
}

const mapStateToProps = state => ({
  user: state.app.get('me'),
  armyList: state.app.get('lastArmyList'),
});

const mapDispatchToProps = {
  onSelectArmy: army =>
    NavigationActions.navigate({ routeName: 'Army', params: { army } }),
};

export default connect(mapStateToProps, mapDispatchToProps)(
  connect()(LastArmyList)
);
