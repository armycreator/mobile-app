// @flow
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import ArmyListComponent from './ArmyListComponent';
import { findArmyForUser } from '../../action/army';

const mapStateToProps = state => ({
  user: state.app.get('me'),
  armyList: state.app.get('lastArmyList'),
});

const mapDispatchToProps = {
  onSelectArmy: army =>
    NavigationActions.navigate({ routeName: 'Army', params: { army } }),
  findArmyForUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(ArmyListComponent);
