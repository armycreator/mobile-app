// @flow
import { push } from 'react-router-redux';
import sdk from '../Sdk';

export function login(username: string, password: string) {
  return (dispatch: Function) => {
    const formData = { username, password };

    return sdk.tokenStorage
      .generateToken(formData)
      .then(() => sdk.user.findMe())
      .then(user => {
        dispatch({
          type: 'RECEIVE_ME',
          user,
        });
      })
      .then(() => dispatch(push('/armies/')));
  };
}
