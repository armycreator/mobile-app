// @flow
import User from '../Entity/User';
import sdk from '../Sdk';

export function findArmyForUser(user: User) {
  return dispatch => {
    return sdk.army.findByUser(user)
      .then((armyList) => {
        dispatch({
          type: 'LAST_ARMY_LIST_RECEIVE',
          armyList,
        });
        //this.setState(() => ({
        //armyList: this.dataSource.cloneWithRows(
        //  data.get('items').toArray()
        //),
      })
      .catch(console.error)
    ;
  };
}
