// @flow
import { User } from '../entity';
import sdk from '../Sdk';

export function findArmyGroupForUser(user: User) {
  return (dispatch: Function) => {
    sdk.armyGroup
      .findByUser(user)
      .then(armyGroupList => {
        dispatch({
          type: 'ARMY_GROUP_LIST_RECEIVE',
          armyGroupList,
        });
      })
      .catch(console.error);
  };
}
