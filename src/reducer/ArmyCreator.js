// @flow
import { List, Map } from 'immutable';
import { Army, ArmyGroup, Collection, Squad, SquadLine, User } from '../entity';

type State = Map<string, any>;

function setSquadDetail(state: State, squad: Squad) {
  return state.set('currentSquadDetail', squad);
}

function squadLineDetailReceived(state: State, squadLine: SquadLine) {
  const squad = state.get('currentSquadDetail');
  const squadLineList = squad.squadLineList;

  const index = squadLineList.findIndex(
    tmpSquadLine => tmpSquadLine.id === squadLine.id
  );

  const newSquadLineList = squadLineList.set(index, squadLine);

  const newActivePoints = squadLine.inactive
    ? squad.activePoints - squadLine.points
    : squad.activePoints + squadLine.points;

  const newSquad = squad.merge({
    squadLineList: newSquadLineList,
    activePoints: newActivePoints,
  });

  return setSquadDetail(state, newSquad);
}

function armyGroupReceived(state: State, armyGroup: ArmyGroup) {
  return state.setIn(['refreshedArmyGroupList', armyGroup.id], armyGroup);
}

function armyGroupListReceive(state, armyGroupList) {
  return state.set('armyGroupList', armyGroupList);
}

const initialState: State = Map({
  initialized: false,
  me: null,
  lastArmyList: null,
  isMenuOpen: false,
  currentArmyDetail: null,
  currentSquadDetail: null,
  armyGroupList: null,
  refreshedArmyGroupList: Map(),
});

type ActionType = {
  initialized: boolean,
  type: string,
  armyList?: List<Army>,
  armyDetail?: Army,
  squadDetail?: Squad,
  squadLine?: SquadLine,
  user: User,
  isOpen?: boolean,
  armyGroupList?: Collection,
  armyGroup?: ArmyGroup,
};

export default function armyCreatorReducer(
  state: State = initialState,
  action: ActionType
) {
  switch (action.type) {
    case 'RECEIVE_ME':
      return state.set('me', action.user);
    case 'ARMY_GROUP_LIST_RECEIVE':
      return armyGroupListReceive(state, action.armyGroupList);
    case 'LAST_ARMY_LIST_RECEIVE':
      return state.set('lastArmyList', action.armyList);
    case 'ARMY_DETAIL_RECEIVE':
      return state.set('currentArmyDetail', action.armyDetail);
    case 'ARMY_UNMOUNT':
      return state.set('currentArmyDetail', null);
    case 'SQUAD_UNMOUNT':
      return state.set('currentSquadDetail', null);
    case 'SQUAD_DETAIL_RECEIVE':
      return setSquadDetail(state, action.squadDetail);
    case 'SQUAD_LINE_DETAIL_RECEIVE':
      return squadLineDetailReceived(state, action.squadLine);
    case 'TOGGLE_MENU':
      return state.set('isMenuOpen', action.isOpen);
    case 'LOGOUT':
      return initialState;
    case 'ARMY_GROUP_RECEIVE':
      return armyGroupReceived(state, action.armyGroup);
    default:
      return state;
  }
}
