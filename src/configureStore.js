// @flow

import { composeWithDevTools } from 'remote-redux-devtools';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import reducer from './reducer';

export default function configureStore(
  initialState: any,
  history: any,
  AppRouteConfigs
) {
  const composeEnhancers = composeWithDevTools(
    {
      // Specify here name, actionsBlacklist, actionsCreators and other options
    }
  );

  const middlewares = [thunk, routerMiddleware(history)];

  return createStore(
    reducer(AppRouteConfigs),
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  );
}
