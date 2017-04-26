// @flow

import { composeWithDevTools } from 'remote-redux-devtools';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { NavigationActions } from 'react-navigation';
import reducer from './reducer';
import sdk from './Sdk';

const authorizedRoutes = ['DrawerOpen', 'DrawerClose', 'Login', 'Logout'];

function checkAccessToken(next: Function) {
  // if we navigate, check if an access token is found
  return sdk.tokenStorage.hasAccessToken().then(hasAccessToken => {
    if (!hasAccessToken) {
      // if no access token is found, then redirect to login
      return next(NavigationActions.navigate({ routeName: 'Login' }));
    }

    return hasAccessToken;
  });
}

const LoginMiddleware = store => next => action => {
  console.log(action);
  if (action.type === '@@ArmyCreator/INIT') {
    return checkAccessToken(next)
      .then(hasAccessToken => {
        if (hasAccessToken) {
          return sdk.user.findMe().then(user => {
            store.dispatch({
              type: 'RECEIVE_ME',
              user,
            });
          });
        }
      })
      .then(() => next(action));
  } else if (
    action.type === 'Navigation/NAVIGATE' &&
    !authorizedRoutes.includes(action.routeName)
  ) {
    return checkAccessToken(next).then(
      hasAccessToken => hasAccessToken && next(action)
    );
  }

  return next(action);
};

export default function configureStore(initialState: any, AppNavigator: any) {
  const composeEnhancers = composeWithDevTools(
    {
      // Specify here name, actionsBlacklist, actionsCreators and other options
    }
  );

  const middlewares = [thunk, LoginMiddleware];

  return createStore(
    reducer(AppNavigator),
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  );
}
