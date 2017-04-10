// @flow
import { List, Map } from 'immutable';
import { Army, Squad, User } from '../entity';

type State = Map<string, any>;

const initialState: State = Map({
  me: null,
  lastArmyList: null,
  isMenuOpen: false,
  currentArmyDetail: null,
  currentSquadDetail: null,
});

type ActionType = {
  type: string,
  armyList?: List<Army>,
  armyDetail?: Army,
  squadDetail?: Squad,
  user: User,
};

export default function armyCreatorReducer(
  state: State = initialState,
  action: ActionType
) {
  switch (action.type) {
    case 'RECEIVE_ME':
      return state.set('me', action.user);
    case 'LAST_ARMY_LIST_RECEIVE':
      return state.set('lastArmyList', action.armyList);
    case 'ARMY_DETAIL_RECEIVE':
      return state.set('currentArmyDetail', action.armyDetail);
    case 'ARMY_UNMOUNT':
      return state.set('currentArmyDetail', null);
    case 'SQUAD_DETAIL_RECEIVE':
      return state.set('currentSquadDetail', action.squadDetail);
    default:
      return state;
  }
}
