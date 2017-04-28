// @flow

import { composeWithDevTools } from 'remote-redux-devtools';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { NavigationActions } from 'react-navigation';
import reducer from './reducer';
import sdk from './Sdk';

const authorizedRoutes = ['DrawerOpen', 'DrawerClose', 'Login', 'Logout'];

function checkAccessToken() {
  // if we navigate, check if an access token is found
  return sdk.tokenStorage.hasAccessToken().then(hasAccessToken => {
    if (!hasAccessToken) {
      throw new Error('No access token found');
      // if no access token is found, then redirect to login
      // return next(NavigationActions.navigate({ routeName: 'Login' }));
    }
  });
}

const LoginMiddleware = store => next => action => {
  if (action.type === '@@ArmyCreator/INIT') {
    return checkAccessToken()
      .then(hasAccessToken => {
        return sdk.user.findMe().then(user => {
          store.dispatch({
            type: 'RECEIVE_ME',
            user,
          });
        });
      })
      .then(() => next(action))
      .catch(e => next(NavigationActions.navigate({ routeName: 'Login' })));
  } else if (
    action.type === 'Navigation/NAVIGATE' &&
    !authorizedRoutes.includes(action.routeName)
  ) {
    return checkAccessToken()
      .then(() => next(action))
      .catch(() => next(NavigationActions.navigate({ routeName: 'Login' })));
  } else if (
    action.type === 'Navigation/NAVIGATE' &&
    action.routeName === 'Login'
  ) {
    return checkAccessToken()
      .then(() =>
        next(
          NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'ArmyList' })],
          })
        )
      )
      .catch(() => next(action));
  }

  return next(action);
};

export default function configureStore(AppNavigator: any) {
  const composeEnhancers = composeWithDevTools(
    {
      // Specify here name, actionsBlacklist, actionsCreators and other options
    }
  );

  const middlewares = [thunk, LoginMiddleware];

  return createStore(
    reducer(AppNavigator),
    composeEnhancers(applyMiddleware(...middlewares))
  );
}
