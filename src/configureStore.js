// @flow

import { composeWithDevTools } from 'remote-redux-devtools';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';

export default function configureStore(initialState: any, AppNavigator) {
  const composeEnhancers = composeWithDevTools(
    {
      // Specify here name, actionsBlacklist, actionsCreators and other options
    }
  );

  const middlewares = [thunk];

  return createStore(
    reducer(AppNavigator),
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  );
}
