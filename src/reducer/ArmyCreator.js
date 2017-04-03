// @flow
import { Map } from 'immutable';
import User from '../Entity/User';

type State = Map<string, any>;

const initialState: State = Map({
  currentUser: null,
});

export default function armyCreatorReducer(state = initialState, action) {
  switch(action.type) {
      case 'RECEIVE_ME':
        return state.set('me', action.user);
      case 'LAST_ARMY_LIST_RECEIVE':
        return state.set('lastArmyList', action.armyList);
      default:
        return state;
  }
}
