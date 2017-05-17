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

export function findArmyGroup(id: string) {
  return (dispatch: Function) => sdk.armyGroup
      .find(id)
      .then(armyGroup => {
        dispatch({
          type: 'ARMY_GROUP_RECEIVE',
          armyGroup,
        });
      })
      .catch(console.error);
}
