// @flow
import { NavigationActions } from 'react-navigation';
import sdk from '../Sdk';

function goToArmyList() {
  return dispatch => {
    return sdk.user
      .findMe()
      .then(user => {
        dispatch({
          type: 'RECEIVE_ME',
          user,
        });
      })
      .then(() =>
        dispatch(NavigationActions.navigate({ routeName: 'ArmyList' }))
      );
  };
}

export function login(username: string, password: string) {
  return (dispatch: Function) => {
    const formData = { username, password };

    return sdk.tokenStorage
      .generateToken(formData)
      .then(() => goToArmyList()(dispatch));
  };
}

export function logout() {
  return dispatch => {
    dispatch({ type: 'LOGOUT' });
    sdk.tokenStorage.logout().then(() => {
      dispatch(NavigationActions.navigate({ routeName: 'Login' }));
    });
  };
}
