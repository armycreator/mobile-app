// @flow

import RestClientSdk, { TokenStorage, PasswordGenerator } from 'rest-client-sdk';
import { AsyncStorage } from 'react-native';
import ArmyClient from './entity/client/ArmyClient';
import UserClient from './entity/client/UserClient';
import { OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET } from '../config';
import entityFactory from './entity/entityFactory';

const tokenGeneratorConfig = {
  path: 'oauth2.armycreator.net/oauth/v2/token',
  scheme: 'https',
  clientId: OAUTH_CLIENT_ID,
  clientSecret: OAUTH_CLIENT_SECRET,
};
const tokenGenerator = new PasswordGenerator(tokenGeneratorConfig);
const storage = AsyncStorage;
const tokenStorage = new TokenStorage(tokenGenerator, storage);


const config = {
      path: 'api.armycreator.net',
      scheme: 'https',
      port: 443,
      segment: '/v1',
      authorizationType: 'Bearer', // default to "Bearer", but can be "Basic" or anything
      useDefaultParameters: true,
};

const clients = {
  user: UserClient,
  army: ArmyClient,
  // ...
};

const sdk = new RestClientSdk(
  tokenStorage,
  config,
  clients,
  entityFactory
);

export default sdk;
