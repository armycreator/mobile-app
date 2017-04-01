// @flow
import { push } from 'react-router-redux';
import RestClientSdk from 'rest-client-sdk';
import sdk from '../Sdk';

export function login(username: string, password: string) {
  return dispatch => {
    const formData =  { username, password };

    return sdk.tokenStorage.generateToken(formData)
      .then(() => dispatch(push('/armies')))
    ;
  };
}
