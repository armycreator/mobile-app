// @flow
import { Map } from 'immutable';
import { User } from '../entity';

type State = Map<string, any>;

const initialState: State = Map({
  me: null,
});


type ActionType = {
  type: string,
  armyList?: Map<any, any>,
  armyDetail?: Map<any, any>,
  user: User,
}

export default function armyCreatorReducer(state:State = initialState, action: ActionType) {
  switch(action.type) {
      case 'RECEIVE_ME':
        return state.set('me', action.user);
      case 'LAST_ARMY_LIST_RECEIVE':
        return state.set('lastArmyList', action.armyList);
      case 'ARMY_DETAIL_RECEIVE':
        return state.set('currentArmyDetail', action.armyDetail);
      default:
        return state;
  }
}
