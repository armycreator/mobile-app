import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';
import ArmycreatorReducer from './ArmyCreator';

export default function(AppRouteConfigs) {
  const AppNavigator = StackNavigator(AppRouteConfigs);

  const navReducer = (state, action) => {
    const newState = AppNavigator.router.getStateForAction(action, state);
    return newState ? newState : state;
  };

  return combineReducers({
    app: ArmycreatorReducer,
    routing: routerReducer,
    nav: navReducer,
  });
}
