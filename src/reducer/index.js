import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import ArmycreatorReducer from './ArmyCreator';

export default combineReducers(
  {
    app: ArmycreatorReducer,
    routing: routerReducer,
  }
);
