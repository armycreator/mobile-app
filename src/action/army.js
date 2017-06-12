// @flow
import { User } from '../entity';
import sdk from '../Sdk';

export function findArmyForUser(user: User, page: number = 1) {
  return (dispatch: Function) =>
    sdk.army
      .findByUser(user, page)
      .then(armyList => {
        dispatch({
          type: 'LAST_ARMY_LIST_RECEIVE',
          armyList,
          page,
        });
        // this.setState(() => ({
        // armyList: this.dataSource.cloneWithRows(
        //  data.get('items').toArray()
        // ),
      })
      .catch(console.error);
}

export function fetchArmyDetail(id: number) {
  return (dispatch: Function) =>
    sdk.army
      .find(id)
      .then(armyDetail => {
        dispatch({
          type: 'ARMY_DETAIL_RECEIVE',
          armyDetail,
        });
      })
      .catch(console.error);
}

export function onArmyUnmount() {
  return {
    type: 'ARMY_UNMOUNT',
  };
}
