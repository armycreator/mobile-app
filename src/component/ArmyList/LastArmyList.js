// @flow
import React from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import ArmyListComponent from './ArmyListComponent';
import { findArmyForUser } from '../../action/army';
import { Collection, User } from '../../entity';

type LastArmyListType = {
  dispatch: Function,
  page: number,
  maxPage: number,
  user: ?User,
  armyList: ?Collection,
  onSelectArmy: Function,
};

function LastArmyList({
  dispatch,
  user,
  page,
  maxPage,
  ...props
}: LastArmyListType) {
  if (!user) {
    return null;
  }

  return (
    <ArmyListComponent
      fetchArmyList={() => dispatch(findArmyForUser(user, page))}
      fetchNextPage={() =>
        maxPage > page && dispatch(findArmyForUser(user, page + 1))}
      {...props}
    />
  );
}

const mapStateToProps = state => ({
  user: state.app.get('me'),
  armyList: state.app.get('lastArmyList'),
  page: state.app.getIn(['lastArmyList', 'current_page_number']),
  maxPage:
    parseInt(
      state.app.getIn(['lastArmyList', 'total_count']) /
        state.app.getIn(['lastArmyList', 'num_items_per_page']),
      10
    ) + 1,
});

const mapDispatchToProps = {
  onSelectArmy: army =>
    NavigationActions.navigate({ routeName: 'Army', params: { army } }),
};

export default connect(mapStateToProps, mapDispatchToProps)(
  connect()(LastArmyList)
);
