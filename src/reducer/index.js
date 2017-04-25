import { combineReducers } from 'redux';
import ArmycreatorReducer from './ArmyCreator';

export default function(AppNavigator) {
  const navReducer = (state, action) => {
    const newState = AppNavigator.router.getStateForAction(action, state);
    return newState ? newState : state;
  };

  return combineReducers({
    app: ArmycreatorReducer,
    nav: navReducer,
  });
}
