// @flow
import { Map } from 'immutable';
import User from '../Entity/User';

type State = Map<string, any>;

const initialState: State = Map({
  currentUser: null,
});

export default function armyCreatorReducer(state = initialState, action) {
  switch(action.type) {
      default:
        return state;
  }
}
