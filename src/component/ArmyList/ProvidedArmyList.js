// @flow
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import ArmyListComponent from './ArmyListComponent';
import { Collection } from '../../entity';

const mapStateToProps = (state, ownProps) => {
  const armyList = new Collection({
    items: ownProps.navigation.state.params.armyList,
  });

  return {
    user: state.app.get('me'),
    armyList,
  };
};

const mapDispatchToProps = {
  onSelectArmy: army =>
    NavigationActions.navigate({ routeName: 'Army', params: { army } }),
};

export default connect(mapStateToProps, mapDispatchToProps)(ArmyListComponent);
